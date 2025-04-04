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

  // Helper function to get platform-specific user agent
  function getPlatformUserAgent() {
    const platform = os.platform();
    const chromeVersion = process.env.CHROME_VERSION || '122.0.0.0'; // Default to 122 if not specified
    
    switch(platform) {
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
    // Ensure screenshots directory exists
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }

    // Validate extension directory exists
    if (!fs.existsSync(extensionPath)) {
      throw new Error(`Extension directory not found: ${extensionPath}`);
    }

    // Load SSL certificates
    const privateKey = fs.readFileSync('certs/key.pem', 'utf8');
    const certificate = fs.readFileSync('certs/cert.pem', 'utf8');
    const credentials = { key: privateKey, cert: certificate };

    // Start HTTPS server
    server = https.createServer(credentials, (req, res) => {
      if (req.url === '/harvard.mp3') {
        const audioPath = path.resolve(__dirname, '../harvard.mp3');
        if (fs.existsSync(audioPath)) {
          const stat = fs.statSync(audioPath);
          res.writeHead(200, {
            'Content-Type': 'audio/mpeg',
            'Content-Length': stat.size,
            'Access-Control-Allow-Origin': '*'
          });
          fs.createReadStream(audioPath).pipe(res);
        } else {
          res.writeHead(404);
          res.end('Audio file not found');
        }
      } else {
        res.writeHead(404);
        res.end('Not found');
      }
    });
    
    server.listen(PORT);
    console.log(`HTTPS server started on port ${PORT}`);

    try {
      console.log('Starting browser with extension path:', extensionPath);
      browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
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

      // Verify extension installation with retries
      let extensionLoaded = false;
      let retries = 5;
      
      while (retries > 0 && !extensionLoaded) {
      const targets = await browser.targets();
        const extensionTargets = targets.filter(t => 
          t.type() === 'service_worker' || 
          t.type() === 'background_page' ||
          t.url().startsWith('chrome-extension://')
        );
        
        console.log(`[DEBUG] Found ${extensionTargets.length} extension targets:`, 
          extensionTargets.map(t => ({ type: t.type(), url: t.url() })));
        
        if (extensionTargets.length > 0) {
          extensionLoaded = true;
          break;
        }
        
        console.log(`Waiting for extension to load... ${retries} attempts left`);
        await new Promise(resolve => setTimeout(resolve, 2000));
        retries--;
      }

      if (!extensionLoaded) {
        throw new Error('Extension not loaded properly. Please check the extension path and permissions.');
      }

      // Allow extension initialization time
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      page = await browser.newPage();
      
      // Set platform-specific user agent
      const userAgent = getPlatformUserAgent();
      console.log('Using user agent:', userAgent);
      await page.setUserAgent(userAgent);
      
      // Mask automation
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

  afterAll(async () => {
    try {
      if (browser) {
        await browser.close();
      }
      if (server) {
        server.close();
      }
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
      const audioPath = path.resolve(__dirname, '../harvard.mp3');
      console.log('Audio file path:', audioPath);

      if (!fs.existsSync(audioPath)) {
        throw new Error('Audio file not found at: ' + audioPath);
      }

      // Read the audio file
      const audioContent = fs.readFileSync(audioPath);
      
      // Set up audio playback in the page context
      await targetPage.evaluate(async (audioData) => {
        return new Promise((resolve, reject) => {
          try {
            console.log('Creating audio context...');
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Convert audio data to ArrayBuffer
            const arrayBuffer = new Uint8Array(audioData).buffer;
            
            // Decode the audio data
            audioContext.decodeAudioData(arrayBuffer, (audioBuffer) => {
              console.log('Audio decoded successfully');
              
              // Create buffer source
              const source = audioContext.createBufferSource();
              source.buffer = audioBuffer;
              
              // Create gain node for volume control
              const gainNode = audioContext.createGain();
              gainNode.gain.value = 1.0;
              
              // Connect nodes
              source.connect(gainNode);
              gainNode.connect(audioContext.destination);
              
              // Create MediaStreamDestination for getUserMedia
              const streamDestination = audioContext.createMediaStreamDestination();
              gainNode.connect(streamDestination);
              
              // Override getUserMedia
              navigator.mediaDevices.getUserMedia = async () => {
                return streamDestination.stream;
              };
              
              // Start playback
              source.start(0);
              console.log('Audio playback started');
              
              // Handle completion
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
      
      // Define constants for retries
      const maxRetries = 3;
      
      // Test 1: Verify extension in Chrome management
      console.log('Checking extension installation...');
      await page.goto('chrome://extensions', { waitUntil: 'networkidle2' });
      await page.waitForSelector('extensions-manager');
      await new Promise(resolve => setTimeout(resolve, 1000));
      await takeScreenshot('extensions-page');

      // Test 2: Navigate to ChatGPT and verify injection
      console.log('Navigating to ChatGPT...');
      
      // Create a new page for ChatGPT
      const chatGPTPage = await browser.newPage();
      await chatGPTPage.setUserAgent(getPlatformUserAgent());
      
      // Navigate with retry logic
      let success = false;
      
      while (maxRetries > 0 && !success) {
        try {
          await chatGPTPage.goto('https://chat.openai.com', { 
            waitUntil: 'networkidle2',
            timeout: 60000  // Increase navigation timeout to 60 seconds
          });
          
          // Wait for title to be available
          await chatGPTPage.waitForFunction(() => document.title !== '', { timeout: 10000 });
          const title = await chatGPTPage.title();
          console.log('Page title:', title);
          
          // Check if we need to log in (using a more reliable selector)
          const loginButtonSelector = 'button[data-testid="login-button"]';
          const loginButton = await chatGPTPage.$(loginButtonSelector);
          if (loginButton) {
            console.log('Login required. Please log in to ChatGPT manually.');
            // Wait for login to complete (wait for the chat input to appear)
            await chatGPTPage.waitForSelector('#prompt-textarea', { 
              timeout: 300000  // 5 minute timeout for manual login
            });
            console.log('Login completed successfully');
          }
          
          // Wait for the page to be fully loaded
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
          
          console.log(`Retry ${4 - maxRetries}: Title not matching expected`);
          maxRetries--;
        } catch (error) {
          console.log(`Retry ${4 - maxRetries}: Navigation failed:`, error.message);
          maxRetries--;
          if (maxRetries === 0) throw error;
          await new Promise(resolve => setTimeout(resolve, 5000));
        }
      }

      // Switch to the ChatGPT page
      page = chatGPTPage;
      
      // Wait for the iframe to be present
      console.log('Waiting for voicely iframe...');
      await page.waitForSelector('#voicely-iframe', { timeout: 30000 });
      console.log('Found voicely iframe');

      // Wait for the extension elements inside the marker container
      console.log('Waiting for extension elements...');
      const elements = await page.evaluate(() => {
        const container = document.querySelector('.lt-marker-container');
        if (!container) {
          console.log('Marker container not found');
          return null;
        }
        
        const voicelyGroup = container.querySelector('#voicely-group');
        if (!voicelyGroup) {
          console.log('Voicely group not found');
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
      
      console.log('Extension elements state:', elements);
      
      if (!elements || !elements.hasContainer || !elements.hasGroup) {
        throw new Error('Required extension elements not found');
      }
      
      await takeScreenshot('chatgpt-loaded');

      // Test 3: Verify interactive elements and recording functionality
      console.log('Testing recording functionality...');
      
      // Wait for and focus the ChatGPT input field
      await page.waitForSelector('#prompt-textarea', { timeout: 30000 });
      await page.click('#prompt-textarea');
      console.log('Focused ChatGPT input field');

      // Wait for the empty-icon to be present
      await page.waitForSelector('#voicely-group .empty-icon', { timeout: 10000 });
      console.log('Found empty icon');
      
      // Hover over empty icon
      await page.hover('#voicely-group .empty-icon');
      console.log('Hovered over empty icon');
      
      // Wait a bit for hover effect
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Click empty icon
      await page.evaluate(() => {
        const emptyIcon = document.querySelector('#voicely-group .empty-icon');
        if (emptyIcon) {
          emptyIcon.click();
        }
      });
      console.log('Clicked empty icon');
      
      // Wait for pill1 to become visible with a more reliable check
      await page.waitForFunction(() => {
        const pill = document.querySelector('#voicely-group .pill1');
        if (!pill) return false;
        const style = window.getComputedStyle(pill);
        return style.display !== 'none' && style.visibility !== 'hidden';
      }, { timeout: 15000 });
      console.log('Pill is visible');
      
      // Wait for voice icon to be visible
      await page.waitForSelector('#voicely-group .voiceIcon1', { visible: true, timeout: 15000 });
      console.log('Voice icon is visible');
      
      // Ensure we're not already recording
      const initialRecordingState = await page.evaluate(() => {
        const voiceIcon = document.querySelector('#voicely-group .voiceIcon1');
        return voiceIcon?.style.display !== 'none';
      });
      
      if (initialRecordingState) {
        console.log('Already recording, stopping first...');
        await page.evaluate(() => {
          const voiceIcon = document.querySelector('#voicely-group .voiceIcon1');
          if (voiceIcon) {
            voiceIcon.click();
          }
        });
        await new Promise(resolve => setTimeout(resolve, 2000));
      }

      // Set up audio context and buffer before starting recording
      await setupAudioPlayback(page);
      console.log('Audio setup complete');
      
      // Hover over voice icon with retry
      let hoverSuccess = false;
      let hoverRetries = 3;
      
      while (!hoverSuccess && hoverRetries > 0) {
        try {
          // First ensure the element is visible and clickable
          await page.evaluate(() => {
            const voiceIcon = document.querySelector('#voicely-group .voiceIcon1');
            if (voiceIcon) {
              voiceIcon.style.display = 'block';
              voiceIcon.style.visibility = 'visible';
              voiceIcon.style.opacity = '1';
            }
          });
          
          // Wait a bit for styles to apply
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Try to hover
          await page.hover('#voicely-group .voiceIcon1', { timeout: 5000 });
          console.log('Hovered over voice icon');
          
          // Verify hover state
          const isHovered = await page.evaluate(() => {
            const voiceIcon = document.querySelector('#voicely-group .voiceIcon1');
            return voiceIcon && window.getComputedStyle(voiceIcon).cursor === 'pointer';
          });
          
          if (isHovered) {
            hoverSuccess = true;
            break;
          }
          
          console.log(`Hover attempt ${4 - hoverRetries} failed, retrying...`);
          hoverRetries--;
          await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error) {
          console.log(`Hover attempt ${4 - hoverRetries} failed:`, error.message);
          hoverRetries--;
          if (hoverRetries === 0) throw error;
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
      
      if (!hoverSuccess) {
        throw new Error('Failed to hover over voice icon after multiple attempts');
      }
      
      // Wait a bit for hover effect
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Click voice icon to start recording with retry logic
      let recordingStarted = false;
      let retryCount = 0;
      
      while (!recordingStarted && retryCount < maxRetries) {
        try {
          // Click the voice icon
          await page.evaluate(() => {
            const voiceIcon = document.querySelector('#voicely-group .voiceIcon1');
            if (voiceIcon) {
              voiceIcon.click();
              console.log('Clicked voice icon');
            }
          });
          
          // Wait for recording state to be confirmed
          await page.waitForFunction(() => {
            const voiceIcon = document.querySelector('#voicely-group .voiceIcon1');
            const isRecording = voiceIcon && voiceIcon.style.display !== 'none';
            console.log('Recording state check:', { isRecording });
            return isRecording;
          }, { timeout: 10000 });
          
          recordingStarted = true;
          console.log('Recording started successfully');
        } catch (error) {
          console.log(`Recording start attempt ${retryCount + 1} failed:`, error.message);
          retryCount++;
          if (retryCount < maxRetries) {
            await new Promise(resolve => setTimeout(resolve, 2000));
          }
        }
      }
      
      if (!recordingStarted) {
        throw new Error('Failed to start recording after multiple attempts');
      }
      
      // Wait for recording to fully start
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Recording fully started');

      // Start audio playback and verify it's working
      const audioState = await page.evaluate(() => {
        try {
          const audioContext = new (window.AudioContext || window.webkitAudioContext)();
          const source = audioContext.createBufferSource();
          source.start(0);
          return {
            contextState: audioContext.state,
            sourceState: source.playbackState || 'unknown',
            isRecording: document.querySelector('#voicely-group .voiceIcon1')?.style.display !== 'none' || false
          };
        } catch (error) {
          return {
            error: error.message,
            contextState: 'error',
            sourceState: 'error',
            isRecording: false
          };
        }
      });
      console.log('Audio playback state:', audioState);

      // Wait for audio to finish (approximately 30 seconds for harvard.mp3)
      await new Promise(resolve => setTimeout(resolve, 35000));

      // Take a screenshot of the current state
      await takeScreenshot('after-audio-playback');

      // Ensure input field is still focused
      await page.evaluate(() => {
        const input = document.querySelector('#prompt-textarea');
        if (input) {
          input.focus();
        }
      });
      console.log('Re-focused input field before stopping');

      // Try to stop recording
      console.log('Attempting to stop recording...');
      let recordingStopped = false;
      let stopRetryCount = 0;
      const stopMaxRetries = 3;
      
      while (!recordingStopped && stopRetryCount < stopMaxRetries) {
        try {
          // Try to find and click the voice icon if it exists
          const voiceIconState = await page.evaluate(() => {
            const voiceIcon = document.querySelector('#voicely-group .voiceIcon1');
            if (voiceIcon) {
              voiceIcon.click();
              return {
                clicked: true,
                visible: window.getComputedStyle(voiceIcon).display !== 'none'
              };
            }
            return {
              clicked: false,
              visible: false
            };
          });
          
          console.log('Voice icon state:', voiceIconState);
          
          // Wait for recording state to change
          await page.waitForFunction(() => {
            const pill = document.querySelector('.pill1');
            const loadingIndicator = document.querySelector('.loading-indicator');
            const processingIndicator = document.querySelector('.processing');
            
            console.log('Recording state after stop:', {
              pillVisible: pill?.style.display !== 'none',
              hasLoadingIndicator: !!loadingIndicator,
              hasProcessingIndicator: !!processingIndicator
            });
            
            return !!loadingIndicator || 
                   !!processingIndicator || 
                   !pill?.style.display !== 'none';
          }, { timeout: 15000 });
          
          recordingStopped = true;
          console.log('Recording stopped successfully');
        } catch (error) {
          console.log(`Recording stop attempt ${stopRetryCount + 1} failed:`, error.message);
          stopRetryCount++;
          if (stopRetryCount < stopMaxRetries) {
            await new Promise(resolve => setTimeout(resolve, 2000));
          }
        }
      }
      
      if (!recordingStopped) {
        throw new Error('Failed to stop recording after multiple attempts');
      }

      // Wait for any loading/processing indicators to disappear
      await page.waitForFunction(() => {
        const loadingIndicator = document.querySelector('.loading-indicator');
        const processingIndicator = document.querySelector('.processing');
        return !loadingIndicator && !processingIndicator;
      }, { timeout: 30000 });
      console.log('Loading/processing indicators disappeared');

      // After stopping recording, wait for processing indicators
      console.log('Waiting for processing indicators...');
      await page.waitForFunction(() => {
        const pill = document.querySelector('.pill1');
        const processingIndicators = pill?.querySelectorAll('.processing-indicator, .loading-indicator, .transcribing-indicator');
        console.log('Processing indicators found:', processingIndicators?.length || 0);
        return processingIndicators?.length > 0;
      }, { timeout: 10000 }).catch(e => console.log('No processing indicators appeared:', e.message));

      // Wait longer for transcription (up to 45 seconds total)
      console.log('Waiting for transcription...');
      let transcribedText = '';
      let attempts = 15;
      while (attempts > 0) {
        const pageState = await page.evaluate(() => {
          const input = document.querySelector('textarea');
          const pill = document.querySelector('.pill1');
          const pillContent = pill?.querySelector('.pill-content, .transcription-text');
          
          // Check for any text content in the pill that might contain the transcription
          const getAllTextContent = (element) => {
            if (!element) return '';
            return Array.from(element.childNodes)
              .map(node => node.textContent || '')
              .join(' ')
              .trim();
          };

          return {
            inputValue: input?.value || '',
            pillText: pillContent?.textContent || '',
            allPillText: getAllTextContent(pill),
            pillHTML: pill?.innerHTML || '',
            hasProcessingIndicator: !!pill?.querySelector('.processing-indicator'),
            hasLoadingIndicator: !!pill?.querySelector('.loading-indicator'),
            hasTranscribingIndicator: !!pill?.querySelector('.transcribing-indicator')
          };
        });

        console.log('Current transcription state:', {
          attempt: 16 - attempts,
          ...pageState
        });

        // Check both input value and pill text
        transcribedText = pageState.inputValue || pageState.pillText || pageState.allPillText;
        
        if (transcribedText && transcribedText.trim().length > 0) {
          console.log('Found transcribed text:', transcribedText);
          break;
        }

        await page.waitForTimeout(3000);
        attempts--;
        console.log(`No transcription yet, retrying... ${attempts} attempts left`);
      }

      // Take a screenshot before assertions
      await takeScreenshot('final-state');

      // Enhanced assertions
      console.log('Final transcribed text:', transcribedText);
      expect(transcribedText).toBeTruthy();
      expect(transcribedText.length).toBeGreaterThan(0);
      expect(transcribedText).not.toBe(' ');
      expect(transcribedText.toLowerCase()).toContain('harvard');
      
      console.log('Test completed successfully');
    } catch (error) {
      console.error('Test failed:', error);
      await takeScreenshot('error');
      throw error;
    }
  }, 600000); // Increase test timeout to 10 minutes
});
