export class DrawioResourceLoader {
    private DRAWIO_DIR = 'public/drawio/src/main/webapp';
    private graphEditorResources = [
        'Editor.js',
        'EditorUi.js',
        'Sidebar.js',
        'Graph.js',
        'Format.js',
        'Shapes.js',
        'Actions.js',
    ];
    private sidebarResources = [
        'Sidebar.js',
        'Sidebar-Advanced.js',
        'Sidebar-ActiveDirectory.js',
        'Sidebar-AlliedTelesis.js',
        'Sidebar-Android.js',
        'Sidebar-ArchiMate.js',
        'Sidebar-ArchiMate3.js',
        'Sidebar-Arrows2.js',
        'Sidebar-Atlassian.js',
        'Sidebar-AWS.js',
        'Sidebar-AWS3.js',
        'Sidebar-AWS3D.js',
        'Sidebar-AWS4.js',
        'Sidebar-AWS4b.js',
        'Sidebar-Azure.js',
        'Sidebar-Azure2.js',
        'Sidebar-Basic.js',
        'Sidebar-Bootstrap.js',
        'Sidebar-BPMN.js',
        'Sidebar-C4.js',
        'Sidebar-Cabinet.js',
        'Sidebar-Cisco.js',
        'Sidebar-Cisco19.js',
        'Sidebar-CiscoSafe.js',
        'Sidebar-Citrix.js',
        'Sidebar-Cumulus.js',
        'Sidebar-DFD.js',
        'Sidebar-EIP.js',
        'Sidebar-Electrical.js',
        'Sidebar-ER.js',
        'Sidebar-Floorplan.js',
        'Sidebar-Flowchart.js',
        'Sidebar-FluidPower.js',
        'Sidebar-GCP.js',
        'Sidebar-GCP2.js',
        'Sidebar-Gmdl.js',
        'Sidebar-IBM.js',
        'Sidebar-Infographic.js',
        'Sidebar-Ios.js',
        'Sidebar-Ios7.js',
        'Sidebar-Kubernetes.js',
        'Sidebar-LeanMapping.js',
        'Sidebar-Mockup.js',
        'Sidebar-MSCAE.js',
        'Sidebar-Network.js',
        'Sidebar-Office.js',
        'Sidebar-PID.js',
        'Sidebar-Rack.js',
        'Sidebar-Signs.js',
        'Sidebar-Sitemap.js',
        'Sidebar-Sysml.js',
        'Sidebar-ThreatModeling.js',
        'Sidebar-UML25.js',
        'Sidebar-Veeam.js',
        'Sidebar-Veeam2.js',
        'Sidebar-VVD.js',
        'Sidebar-WebIcons.js',
    ];
    private static instance: DrawioResourceLoader;
    private promise: Promise<Window> | null = null;
    private constructor() {
        window.uiTheme = 'light';
        window.urlParams = window.urlParams || {};
        window.isLocalStorage = window.isLocalStorage || false;
        window.mxLoadSettings = window.mxLoadSettings || urlParams['configure'] != '1';

        window.isSvgBrowser =
            window.isSvgBrowser || navigator.userAgent.indexOf('MSIE') < 0 || document.documentMode >= 9;
        window.VIEWER_URL = null;
        window.SHAPES_PATH = `${this.DRAWIO_DIR}/shapes`;
        window.TEMPLATE_PATH = `${this.DRAWIO_DIR}/templates`;
        window.RESOURCES_PATH = `${this.DRAWIO_DIR}/resources`;
        window.RESOURCE_BASE = window.RESOURCES_PATH + '/grapheditor';
        window.mxLoadResources = window.mxLoadResources || false;
        window.MAX_REQUEST_SIZE = window.MAX_REQUEST_SIZE || 10485760;
        window.MAX_AREA = window.MAX_AREA || 15000 * 15000;

        window.STENCIL_PATH = `${this.DRAWIO_DIR}/stencils`;
        window.STYLE_PATH = `${this.DRAWIO_DIR}/styles`;
        window.IMAGE_PATH = `${this.DRAWIO_DIR}/images`;
        window.GRAPH_IMAGE_PATH = `${this.DRAWIO_DIR}/img`;
        window.CSS_PATH = `${this.DRAWIO_DIR}/styles`;
        window.OPEN_FORM = window.OPEN_FORM || 'open.html';
        window.mxBasePath = `${this.DRAWIO_DIR}/mxgraph`;
        window.mxImageBasePath = `${this.DRAWIO_DIR}/mxgraph/images`;
        window.mxLanguage = 'ru';
        window.mxLanguages = window.mxLanguages || ['ru', 'en'];
        window.mxSettings = {};
    }
    private async injectScript(filePath: string) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = filePath;
        const loadPromise = new Promise((resolve, reject) => {
            script.addEventListener(
                'load',
                function () {
                    resolve(script);
                },
                false,
            );
            document.getElementsByTagName('head')[0].appendChild(script);
        });
        return loadPromise;
    }
    private async injectStyle(filePath: string) {
        const style = document.createElement('link');
        style.rel = 'stylesheet';
        style.type = 'text/css';
        style.href = filePath;
        const loadPromise = new Promise((resolve, reject) => {
            style.addEventListener(
                'load',
                function () {
                    resolve(style);
                },
                false,
            );
            document.getElementsByTagName('head')[0].appendChild(style);
        });
        return loadPromise;
    }
    public static getInstance(): DrawioResourceLoader {
        if (!DrawioResourceLoader.instance) {
            DrawioResourceLoader.instance = new DrawioResourceLoader();
        }

        return DrawioResourceLoader.instance;
    }

    public async load() {
        if (this.promise) return this.promise;
        console.time();

        this.promise = new Promise(async (resolve) => {
            await this.injectScript(`${this.DRAWIO_DIR}/js/deflate/pako.min.js`);
            await this.injectScript(`${this.DRAWIO_DIR}/js/deflate/base64.js`);
            await this.injectScript(`${this.DRAWIO_DIR}/js/jscolor/jscolor.js`);
            await this.injectScript(`${this.DRAWIO_DIR}/js/jscolor/jscolor.js`);
            await this.injectScript(`${this.DRAWIO_DIR}/js/sanitizer/sanitizer.min.js`);
            await this.injectScript(`${this.DRAWIO_DIR}/mxgraph/mxClient.js`);
            await Promise.all(
                this.graphEditorResources.map((name) => this.injectScript(`${this.DRAWIO_DIR}/js/grapheditor/${name}`)),
            );

            await Promise.all(
                this.sidebarResources.map((name) =>
                    this.injectScript(`${this.DRAWIO_DIR}/js/diagramly/sidebar/${name}`),
                ),
            );
            await this.injectStyle(`${this.DRAWIO_DIR}/mxgraph/css/common.css`)
            await this.injectStyle(`${this.DRAWIO_DIR}/mxgraph/css/explorer.css`)
            await this.injectStyle(`${this.DRAWIO_DIR}/styles/atlas.css`)
            await this.injectStyle(`${this.DRAWIO_DIR}/styles/grapheditor.css`)
            
            fetch(RESOURCES_PATH + '/dia_ru.txt')
                .then((resp) => resp.text())
                .then((resource) => {
                    mxResources.parse(resource);
                    console.timeEnd();
                    resolve(window);
                });
        });

        return await this.promise;
    }
}
