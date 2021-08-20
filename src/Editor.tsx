import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { DrawioResourceLoader } from './DrawioResourceLoader';
import { SidebarComponent } from './SidebarComponent';
import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
`
export const EditorComponent = () => {
    const container = useRef(null);
    const [graph, setGraph] = useState(null)
    useEffect(async () => {
        const resourceLoader = DrawioResourceLoader.getInstance()
        const {Editor} = await resourceLoader.load()
        const editor = new Editor();
        const egraph = editor.graph
        setGraph(egraph)

        egraph.init(container.current);
        egraph.getModel().beginUpdate();
        const parent = egraph.getDefaultParent();
        egraph.insertVertex(parent, null, 'table', 100, 100, 50, 50, 'shape=table;whiteSpace=wrap;html=1;');

        const table = egraph.createTable(2, 2, null, null, 'title');
        egraph.importCells([table], 10, 10);
        egraph.getModel().endUpdate();

    }, []);
    return (
        <>
            <SidebarComponent graph={graph}></SidebarComponent>
            <Container > <div ref={container}></div></Container>
        </>
    );
};
