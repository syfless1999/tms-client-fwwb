import React, { Component } from 'react';
import { Col, Row } from 'antd';
import GGEditor, { Flow } from 'gg-editor';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import EditorMinimap from './components/EditorMinimap';
import { FlowContextMenu } from './components/EditorContextMenu';
import { FlowDetailPanel } from './components/EditorDetailPanel';
import { FlowItemPanel } from './components/EditorItemPanel';
import { FlowToolbar } from './components/EditorToolbar';
import { Button } from 'antd';
import styles from './index.less';
import { formatMessage } from 'umi-plugin-react/locale';

GGEditor.setTrackable(false);


class ggEditor extends Component {
  render() {
    return (
      <PageHeaderWrapper content={formatMessage({id:'editormap.guidance'})}>
        <GGEditor className={styles.editor}>
          <Row type="flex" className={styles.editorHd}>
            <Col span={24}>
              <FlowToolbar />
            </Col>
          </Row>
          <Row type="flex" className={styles.editorBd}>
            <Col span={4} className={styles.editorSidebar}>
              <FlowItemPanel />
            </Col>
            <Col span={16} className={styles.editorContent}>
              <Flow className={styles.flow} ref="flow"
                onNodeMouseLeave={(e) => { console.log(e) }}
                onNodeDragEnd={() => { console.log("onNodeDragEnd") }} />
            </Col>
            <Col span={4} className={styles.editorSidebar}>
              <FlowDetailPanel />
              <EditorMinimap />
              <Button type="primary">{formatMessage({id:'editormap.save'})}</Button>
            </Col>
          </Row>
          <FlowContextMenu />
        </GGEditor>
      </PageHeaderWrapper>
    );
  }
}

export default ggEditor;
// export default () => (
//   <PageHeaderWrapper content="圆形表示夹具柜，方形表示生产线，拖动即可放置设施">
//     <GGEditor className={styles.editor}>
//       <Row type="flex" className={styles.editorHd}>
//         <Col span={24}>
//           <FlowToolbar />
//         </Col>
//       </Row>
//       <Row type="flex" className={styles.editorBd}>
//         <Col span={4} className={styles.editorSidebar}>
//           <FlowItemPanel />
//         </Col>
//         <Col span={16} className={styles.editorContent}>
//           <Flow className={styles.flow} onNodeDragEnd={(e) => console.log(e)} />
//         </Col>
//         <Col span={4} className={styles.editorSidebar}>
//           <FlowDetailPanel />
//           <EditorMinimap />
//         </Col>
//       </Row>
//       <FlowContextMenu />
//     </GGEditor>
//   </PageHeaderWrapper>
// );
