export class DrawioResourceLoader {
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
    private constructor() {}
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
    public static getInstance(): DrawioResourceLoader {
        if (!DrawioResourceLoader.instance) {
            DrawioResourceLoader.instance = new DrawioResourceLoader();
        }

        return DrawioResourceLoader.instance;
    }

    public async load() {
        console.time();
        if (this.promise) return this.promise;
        this.promise = new Promise(async (resolve) => {
            await this.injectScript('public/drawio/mxgraph/mxClient.js');
            await Promise.all(
                this.graphEditorResources.map((name) => this.injectScript(`public/drawio/js/grapheditor/${name}`)),
            );

            await Promise.all(
                this.sidebarResources.map((name) =>
                    this.injectScript(`public/drawio/js/diagramly/sidebar/${name}`),
                ),
            );

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
