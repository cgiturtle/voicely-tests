const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const os = require('os');

jest.setTimeout(300000);

describe('Voicely Extension Integration Test', () => {
    let browser;
    let page;
    const extensionPath = path.resolve(__dirname, '../build');
    const screenshotsDir = path.join(__dirname, '../screenshots');

    function getPlatformUserAgent() {
        const platform = os.platform();
        const chromeVersion = process.env.CHROME_VERSION || '122.0.0.0';

        switch (platform) {
            case 'darwin':
                return `Mozilla/5.0 (Macintosh; Intel Mac OS X ${os.release()}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${chromeVersion} Safari/537.36`;
            case 'win32':
                return `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${chromeVersion} Safari/537.36`;
            default:
                return `Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${chromeVersion} Safari/537.36`;
        }
    }

    beforeAll(async () => {
        if (!fs.existsSync(screenshotsDir)) {
            fs.mkdirSync(screenshotsDir, { recursive: true });
        }

        if (!fs.existsSync(extensionPath)) {
            throw new Error(`Extension directory not found: ${extensionPath}`);
        }

        try {
            browser = await puppeteer.launch({
                headless: true,
                defaultViewport: null,
                executablePath: '/usr/bin/chromium-browser',
                protocolTimeout: 300000,
                args: [
                    `--disable-extensions-except=${extensionPath}`,
                    `--load-extension=${extensionPath}`,
                    '--no-sandbox',
                    '--start-maximized',
                    '--allow-insecure-localhost',
                    '--ignore-certificate-errors',
                    '--disable-web-security',
                    '--disable-blink-features=AutomationControlled',
                    '--autoplay-policy=no-user-gesture-required',
                    '--use-fake-ui-for-media-stream',
                    '--use-fake-device-for-media-stream'
                ],
                ignoreDefaultArgs: ['--disable-extensions', '--enable-automation']
            });

            const extensionId = await getExtensionId(browser);
            if (!extensionId) {
                throw new Error('Extension not loaded properly');
            }

            page = await browser.newPage();
            await page.setUserAgent(getPlatformUserAgent());

            await page.evaluateOnNewDocument(() => {
                Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
                window.chrome = { runtime: {} };
            });
        } catch (error) {
            console.error('Failed to launch browser:', error);
            throw error;
        }
    });

    afterAll(async () => {
        try {
            if (browser) await browser.close();
        } catch (error) {
            console.error('Error in cleanup:', error);
        }
    });

    async function getExtensionId(browser) {
        let extensionId;
        let attempts = 5;
        
        while (attempts > 0) {
            const targets = await browser.targets();
            const extensionTarget = targets.find(t => 
                t.type() === 'service_worker' && 
                t.url().startsWith('chrome-extension://')
            );
            
            if (extensionTarget) {
                const url = extensionTarget.url();
                const [, , id] = url.split('/');
                extensionId = id;
                break;
            }
            
            await new Promise(resolve => setTimeout(resolve, 2000));
            attempts--;
        }
        
        return extensionId;
    }

    async function takeScreenshot(name) {
        try {
            const screenshotPath = path.join(screenshotsDir, `${name}-${Date.now()}.png`);
            await page.screenshot({ 
                path: screenshotPath,
                fullPage: true 
            });
            return screenshotPath;
        } catch (error) {
            console.error(`Failed to take screenshot ${name}:`, error);
            return null;
        }
    }

    async function safeHoverAndClick(selector, maxAttempts = 3) {
        let attempt = 0;
        while (attempt < maxAttempts) {
            try {
                attempt++;
                
                await page.waitForSelector(selector, {
                    visible: true,
                    timeout: 30000
                });

                await page.evaluate(selector => {
                    const element = document.querySelector(selector);
                    if (element) element.scrollIntoView({ 
                        behavior: 'auto', 
                        block: 'center',
                        inline: 'center'
                    });
                }, selector);

                await page.evaluate(selector => {
                    const element = document.querySelector(selector);
                    if (element) {
                        element.style.border = '2px solid red';
                        element.style.boxShadow = '0 0 10px rgba(255,0,0,0.5)';
                    }
                }, selector);

                await page.hover(selector, { timeout: 15000 });
                await page.waitForTimeout(1000);
                
                await page.click(selector, { 
                    timeout: 15000,
                    delay: 100
                });
                
                return true;
            } catch (error) {
                console.error(`Attempt ${attempt} failed:`, error.message);
                await takeScreenshot(`hover-fail-${selector}-attempt-${attempt}`);
                
                if (attempt >= maxAttempts) {
                    throw new Error(`Failed to interact with ${selector} after ${maxAttempts} attempts`);
                }
                
                await page.waitForTimeout(2000);
            }
        }
    }

    async function debugElement(selector) {
        const elementInfo = await page.evaluate(selector => {
            const el = document.querySelector(selector);
            if (!el) return { error: 'Element not found' };
            
            const style = window.getComputedStyle(el);
            return {
                tagName: el.tagName,
                id: el.id,
                classes: el.className,
                visible: el.offsetWidth > 0 && el.offsetHeight > 0,
                display: style.display,
                visibility: style.visibility,
                opacity: style.opacity,
                position: el.getBoundingClientRect(),
                parent: el.parentElement?.tagName,
                html: el.outerHTML.slice(0, 500) + (el.outerHTML.length > 500 ? '...' : '')
            };
        }, selector);

        return elementInfo;
    }

    test('Extension loads and injects UI on ChatGPT', async () => {
        try {
            const maxRetries = 3;

            await page.goto('chrome://extensions', { waitUntil: 'networkidle2', timeout: 60000 });
            await page.waitForSelector('extensions-manager');
            await takeScreenshot('extensions-page');

            const chatGPTPage = await browser.newPage();
            await chatGPTPage.setUserAgent(getPlatformUserAgent());

            let success = false;
            for (let attempt = 1; attempt <= maxRetries && !success; attempt++) {
                try {
                    await chatGPTPage.goto('https://chat.openai.com', {
                        waitUntil: 'networkidle2',
                        timeout: 60000
                    });

                    await chatGPTPage.waitForFunction(() => document.title.includes('ChatGPT'), { timeout: 30000 });

                    const loginButton = await chatGPTPage.$('button[data-testid="login-button"]');
                    if (loginButton) {
                        await chatGPTPage.waitForSelector('#prompt-textarea', { timeout: 300000 });
                    }

                    await chatGPTPage.waitForSelector('#prompt-textarea', { 
                        visible: true,
                        timeout: 30000 
                    });
                    success = true;
                } catch (error) {
                    console.log(`Navigation attempt ${attempt} failed:`, error.message);
                    if (attempt >= maxRetries) throw error;
                    await new Promise(resolve => setTimeout(resolve, 5000));
                }
            }

            page = chatGPTPage;
            await takeScreenshot('chatgpt-loaded');

            await page.waitForSelector('#voicely-iframe', { timeout: 60000 });
            
            await debugElement('#voicely-container, #voicely-marker-container');
            await debugElement('#voicely-group');

            const elementsExist = await page.evaluate(() => {
                const container = document.querySelector('#voicely-container') || 
                                document.querySelector('#voicely-marker-container');
                if (!container) return false;
                
                const group = container.querySelector('#voicely-group');
                if (!group) return false;
                
                return {
                    container: !!container,
                    group: !!group,
                    emptyIcon: !!group.querySelector('.empty-icon'),
                    voiceIcon: !!group.querySelector('.voiceIcon1'),
                    pill: !!group.querySelector('.pill1')
                };
            });

            if (!elementsExist || !elementsExist.container || !elementsExist.group) {
                throw new Error('Extension UI elements not found');
            }

            await takeScreenshot('extension-ui-visible');
            
            await page.click('#prompt-textarea', { delay: 100 });
            await page.waitForTimeout(1000);

            await safeHoverAndClick('#voicely-group .empty-icon');
            await page.waitForTimeout(2000);

            await page.waitForSelector('#voicely-group .pill1', { 
                visible: true,
                timeout: 15000 
            });

            await safeHoverAndClick('#voicely-group .voiceIcon1');
            await page.waitForTimeout(2000);

            const isRecording = await page.evaluate(() => {
                const voiceIcon = document.querySelector('#voicely-group .voiceIcon1');
                return voiceIcon && window.getComputedStyle(voiceIcon).display !== 'none';
            });
            
            if (!isRecording) {
                throw new Error('Recording did not start as expected');
            }

            await takeScreenshot('recording-started');

            await safeHoverAndClick('#voicely-group .voiceIcon1');
            await page.waitForTimeout(3000);

            const isStopped = await page.evaluate(() => {
                const processing = document.querySelector('.processing-indicator, .loading-indicator');
                return !!processing;
            });

            if (!isStopped) {
                throw new Error('Recording did not stop as expected');
            }

            await takeScreenshot('recording-stopped');
        } catch (error) {
            console.error('Test failed:', error);
            await takeScreenshot('final-error-state');
            throw error;
        }
    }, 600000);
});