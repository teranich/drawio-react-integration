import { useEffect, useRef } from 'react'
import { DrawioResourceLoader } from './DrawioResourceLoader';
import styled from 'styled-components';
export class BPMEditorUI {
    editor: any;
    container: any;
    graph: any;
    onClose: any;
    onCollapse: any;

    constructor(graph, editor, container: any) {
        this.editor = editor;
        this.container = container;
        this.graph = graph;
    }

    /**
     * Required by drawio
     * @param stylesheet
     */
    createTemporaryGraph(stylesheet: any) {
        var graph = new Graph(document.createElement('div'));
        graph.stylesheet.styles = mxUtils.clone(stylesheet.styles);
        graph.resetViewOnRootChange = false;
        graph.setConnectable(false);
        graph.gridEnabled = false;
        graph.autoScroll = false;
        graph.setTooltips(false);
        graph.setEnabled(false);
    
        // Container must be in the DOM for correct HTML rendering
        graph.container.style.visibility = 'hidden';
        graph.container.style.position = 'absolute';
        graph.container.style.overflow = 'hidden';
        graph.container.style.height = '1px';
        graph.container.style.width = '1px';
        
        return graph;
    }

    insertHandler(cells, asText, model, vertexStyle, edgeStyle, applyAll, recurse) {
    }
    /**
     * Required by drawio
     */
    isOffline() {
        return false;
    }

    /**
     * Required by drawio
     * @param e
     */
    handleError(e: any) {
        console.error(e);
    }
}
const Container = styled.div`
    width: 25vw;
    position: relative !important;
`
export const SidebarComponent  = ({graph}) => {
    const container = useRef(null)
    useEffect(async () => {
        const resourceLoader = DrawioResourceLoader.getInstance()
        const {Editor} = await resourceLoader.load()
        if (graph) {
        const editor = new Editor(false, undefined,  undefined, graph);
        const editorUi = new BPMEditorUI(graph, editor, container.current);
        new Sidebar(editorUi, container.current);
        }
    }, [graph])
    return <Container className="geSidebarContainer" ref={container} >Sidebar</Container>
}