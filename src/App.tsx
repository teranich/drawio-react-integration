import React, { useEffect, Suspense, useState } from 'react';
import './App.scss';
import { observer } from 'mobx-react';
import { EditorComponent } from './Editor';
import { MxCell } from './mxgraph';
import styled from 'styled-components';

const Content = styled.div`
    display: flex;
    padding: 10px;
    width: 100%;
`;
const Header = styled.div`
    padding: 10px;
`;
const App = function App() {
    const [toggle, setToggle] = useState(true);
    return (
        <>
            <Header>
                <button onClick={() => setToggle(!toggle)}>toggle</button>
            </Header>
            <Content>
                {toggle && (
                    <>
                        <EditorComponent />
                    </>
                )}
            </Content>
        </>
    );
};

export default App;
