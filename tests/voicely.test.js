const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const https = require('https');
const os = require('os');

jest.setTimeout(300000);

describe('Voicely Extension Integration Test', () => {
    let browser;
    let page;
    let server;
    const extensionPath = path.resolve(__dirname, '../build');
    const screenshotsDir = path.join(__dirname, '../screenshots');
    const PORT = 3000;

    function getPlatformUserAgent() {
        const platform = os.platform();
        const chromeVersion = process.env.CHROME_VERSION || '122.0.0.0';

        switch (platform) {
            case 'darwin':
                return `Mozilla/5.0 (Macintosh; Intel Mac OS X ${os.release()}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${chromeVersion} Safari/537.36`;
            case 'win32':
                return `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${chromeVersion} Safari/537.36`;
            case 'linux':
                return `Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${chromeVersion} Safari/537.36`;
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
            console.log('Starting browser with extension path:', extensionPath);
            browser = await puppeteer.launch({
                headless: true,
                defaultViewport: null,
                executablePath: '/usr/bin/chromium-browser',
                args: [
                    `--disable-extensions-except=${extensionPath}`,
                    `--load-extension=${extensionPath}`,
                    '--no-sandbox',
                    '--start-maximized',
                    '--allow-insecure-localhost',
                    '--ignore-certificate-errors',
                    '--ignore-certificate-errors-spki-list',
                    '--disable-web-security',
                    '--disable-blink-features=AutomationControlled',
                    '--autoplay-policy=no-user-gesture-required',
                    '--use-fake-ui-for-media-stream',
                    '--use-fake-device-for-media-stream',
                    '--disable-background-timer-throttling',
                    '--disable-backgrounding-occluded-windows',
                    '--disable-renderer-backgrounding'
                ],
                ignoreDefaultArgs: [
                    '--disable-extensions',
                    '--enable-automation',
                    '--mute-audio',
                    '--disable-background-networking',
                    '--disable-sync'
                ]
            });

            // Verify extension installation
            const extensionId = await getExtensionId(browser);
            if (!extensionId) {
                throw new Error('Extension not loaded properly');
            }

            page = await browser.newPage();
            const userAgent = getPlatformUserAgent();
            console.log('Using user agent:', userAgent);
            await page.setUserAgent(userAgent);

            await page.evaluateOnNewDocument(() => {
                Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
                window.chrome = { runtime: {} };
            });

            console.log('Browser started successfully');
        } catch (error) {
            console.error('Failed to launch browser:', error);
            throw error;
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
                console.log('Found extension ID:', extensionId);
                break;
            }
            
            console.log(`Waiting for extension to load... ${attempts} attempts left`);
            await new Promise(resolve => setTimeout(resolve, 2000));
            attempts--;
        }
        
        return extensionId;
    }

    afterAll(async () => {
        try {
            if (browser) await browser.close();
            if (server) server.close();
        } catch (error) {
            console.error('Error in cleanup:', error);
        }
    });

    async function takeScreenshot(name) {
        try {
            const screenshotPath = path.join(screenshotsDir, `${name}.png`);
            await page.screenshot({ path: screenshotPath });
            console.log(`Screenshot saved: ${screenshotPath}`);
        } catch (error) {
            console.error(`Failed to take screenshot ${name}:`, error);
        }
    }

    async function setupAudioPlayback(targetPage) {
        try {
            console.log('Setting up audio playback...');
            const audioPath = path.resolve(__dirname, './harvard.mp3');
            console.log('Audio file path:', audioPath);

            if (!fs.existsSync(audioPath)) {
                throw new Error('Audio file not found at: ' + audioPath);
            }

            const audioContent = fs.readFileSync(audioPath);

            await targetPage.evaluate(async (audioData) => {
                return new Promise((resolve, reject) => {
                    try {
                        console.log('Creating audio context...');
                        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                        const arrayBuffer = new Uint8Array(audioData).buffer;

                        audioContext.decodeAudioData(arrayBuffer, (audioBuffer) => {
                            console.log('Audio decoded successfully');
                            const source = audioContext.createBufferSource();
                            source.buffer = audioBuffer;
                            const gainNode = audioContext.createGain();
                            gainNode.gain.value = 1.0;
                            source.connect(gainNode);
                            gainNode.connect(audioContext.destination);

                            const streamDestination = audioContext.createMediaStreamDestination();
                            gainNode.connect(streamDestination);

                            navigator.mediaDevices.getUserMedia = async () => {
                                return streamDestination.stream;
                            };

                            source.start(0);
                            console.log('Audio playback started');

                            source.onended = () => {
                                console.log('Audio playback completed');
                                audioContext.close();
                                resolve();
                            };
                        }, (error) => {
                            console.error('Failed to decode audio:', error);
                            reject(error);
                        });
                    } catch (error) {
                        console.error('Error in audio setup:', error);
                        reject(error);
                    }
                });
            }, Array.from(audioContent));

            console.log('Audio setup completed successfully');
        } catch (error) {
            console.error('Audio setup failed:', error);
            throw error;
        }
    }

    test('Extension loads and injects UI on ChatGPT', async () => {
        try {
            console.log('Starting extension test...');
            const maxRetries = 3;

            // Verify extension is installed
            await page.goto('chrome://extensions', { waitUntil: 'networkidle2' });
            await page.waitForSelector('extensions-manager');
            await takeScreenshot('extensions-page');

            // Navigate to ChatGPT
            const chatGPTPage = await browser.newPage();
            await chatGPTPage.setUserAgent(getPlatformUserAgent());

            let success = false;
            let retryCount = 0;

            while (retryCount < maxRetries && !success) {
                try {
                    await chatGPTPage.goto('https://chat.openai.com', {
                        waitUntil: 'networkidle2',
                        timeout: 60000
                    });

                    await chatGPTPage.waitForFunction(() => document.title !== '', { timeout: 10000 });
                    const title = await chatGPTPage.title();
                    console.log('Page title:', title);

                    const loginButton = await chatGPTPage.$('button[data-testid="login-button"]');
                    if (loginButton) {
                        console.log('Login required. Please log in to ChatGPT manually.');
                        await chatGPTPage.waitForSelector('#prompt-textarea', {
                            timeout: 300000
                        });
                        console.log('Login completed successfully');
                    }

                    await chatGPTPage.waitForSelector('#prompt-textarea', {
                        timeout: 30000,
                        visible: true
                    }).catch(() => {
                        console.log('Chat input not found after navigation');
                    });

                    if (title.includes('ChatGPT')) {
                        success = true;
                        break;
                    }

                    retryCount++;
                } catch (error) {
                    console.log(`Retry ${retryCount + 1} failed:`, error.message);
                    retryCount++;
                    if (retryCount >= maxRetries) throw error;
                    await new Promise(resolve => setTimeout(resolve, 5000));
                }
            }

            page = chatGPTPage;

            // Wait for extension elements with more robust checks
            console.log('Waiting for extension elements...');
            await page.waitForSelector('#voicely-iframe', { timeout: 60000 });
            console.log('Found voicely iframe');

            // Check for extension elements with retries
            let elementsFound = false;
            let elementRetries = 5;

            while (elementRetries > 0 && !elementsFound) {
                const elements = await page.evaluate(() => {
                    const container = document.querySelector('#voicely-container') || 
                                    document.querySelector('#voicely-marker-container');
                    
                    if (!container) {
                        console.log('Container not found in document:', document.body.innerHTML.slice(0, 500));
                        return null;
                    }

                    const voicelyGroup = container.querySelector('#voicely-group');
                    if (!voicelyGroup) {
                        console.log('Voicely group not found in container:', container.innerHTML);
                        return null;
                    }

                    return {
                        hasContainer: true,
                        hasGroup: true,
                        hasEmptyIcon: !!voicelyGroup.querySelector('.empty-icon'),
                        hasPill: !!voicelyGroup.querySelector('.pill1'),
                        hasVoiceIcon: !!voicelyGroup.querySelector('.voiceIcon1')
                    };
                });

                if (elements && elements.hasContainer && elements.hasGroup) {
                    console.log('Extension elements found:', elements);
                    elementsFound = true;
                    break;
                }

                console.log(`Waiting for extension elements... ${elementRetries} attempts left`);
                elementRetries--;
                await new Promise(resolve => setTimeout(resolve, 2000));
            }

            if (!elementsFound) {
                await takeScreenshot('elements-not-found');
                throw new Error('Required extension elements not found after multiple attempts');
            }

            await takeScreenshot('chatgpt-loaded');

            // Rest of your test logic remains the same...
            // (Recording functionality, audio playback, etc.)

            console.log('Test completed successfully');
        } catch (error) {
            console.error('Test failed:', error);
            await takeScreenshot('error');
            throw error;
        }
    }, 600000);
});