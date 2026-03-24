const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
    console.log('Starting puppeteer...');
    const browser = await puppeteer.launch({ 
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    
    // Set a good viewport size
    await page.setViewport({ width: 1200, height: 1200 });
    
    const mermaidCode = `
graph TD
    Start([Bắt đầu]) --> Create[Tạo mới/Đồng bộ danh mục]
    Create --> Submit[Gửi phê duyệt]
    Submit --> Review{Cấp quản lý duyệt?}
    Review -- Từ chối --> Edit[Chỉnh sửa]
    Edit --> Submit
    Review -- Đồng ý --> Publish[Thiết lập công bố]
    Publish --> End([Kết thúc])
    `;

    const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"></script>
        <script>
            mermaid.initialize({ 
                startOnLoad: true, 
                theme: 'base',
                themeVariables: {
                    primaryColor: '#cddffb',
                    primaryTextColor: '#000',
                    primaryBorderColor: '#4a86e8',
                    lineColor: '#555555',
                    fontFamily: 'Arial',
                    fontSize: '15px'
                }
            });
        </script>
        <style>
            body { 
                background: #f7f9fc; 
                padding: 40px; 
                display:flex; 
                justify-content: center;
                align-items: center; 
            }
            .mermaid { font-family: 'Arial', sans-serif; }
            
            /* Nodes styling like Image 2 */
            .node rect, .node polygon, .node path, .node circle {
                fill: #d0e4ff !important;
                stroke: #4582e6 !important;
                stroke-width: 2px !important;
                filter: drop-shadow(3px 4px 5px rgba(0,0,0,0.2)) !important;
            }
            
            /* Diamonds (decisions) should also look good */
            .node polygon {
                fill: #e8f0fe !important;
            }

            /* Start and End nodes */
            .node.default .label {
                font-weight: 600 !important;
                color: #000 !important;
            }

            /* Edges */
            .edgePath .path {
                stroke: #2b78e4 !important;
                stroke-width: 2.5px !important;
            }
            
            marker path {
                fill: #2b78e4 !important;
                stroke: #2b78e4 !important;
            }

            /* Edge Labels */
            .edgeLabel {
                background-color: #f7f9fc !important;
                color: #d93025 !important; /* Make text like "Từ chối" stand out */
                font-weight: bold !important;
                padding: 2px 6px !important;
                border-radius: 4px;
            }

        </style>
    </head>
    <body>
        <div class="mermaid" id="diagram">${mermaidCode}</div>
    </body>
    </html>
    `;

    console.log('Setting HTML content...');
    await page.setContent(html, { waitUntil: 'networkidle0' });
    
    console.log('Waiting for SVG to render...');
    try {
        await page.waitForSelector('svg', {timeout: 10000});
        // Extra wait just to make sure fonts load and layout finishes
        await new Promise(r => setTimeout(r, 1000));
        
        console.log('Capturing screenshot...');
        const svgElement = await page.$('svg');
        const boundingBox = await svgElement.boundingBox();
        
        const outDir = path.join(__dirname, 'flowdata');
        if (!fs.existsSync(outDir)) {
            fs.mkdirSync(outDir, {recursive: true});
        }
        
        const outPath = path.join(outDir, 'category_flow_1773297910829.png');
        
        await svgElement.screenshot({
            path: outPath,
            omitBackground: false 
        });
        
        console.log('Successfully saved screenshot to ' + outPath);
    } catch (e) {
        console.error('Failed to render:', e);
    }
    
    await browser.close();
})();
