import React from 'react';
import { notification, Input, Button } from 'antd';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import Axios from 'axios';

const uploadFn = (param) => {
    console.log(param);
    const serverURL = '/pic'
    const xhr = new XMLHttpRequest
    const fd = new FormData()
  
    const successFn = (response) => {
      // 假设服务端直接返回文件上传后的地址
      // 上传成功后调用param.success并传入上传后的文件地址
      param.success({
        url: xhr.responseText
      })
    }
  
    const progressFn = (event) => {
      // 上传进度发生变化时调用param.progress
      param.progress(event.loaded / event.total * 100)
    }
  
    const errorFn = (response) => {
      // 上传发生错误时调用param.error
      param.error({
        msg: 'unable to upload.'
      })
    }
  
    xhr.upload.addEventListener("progress", progressFn, false)
    xhr.addEventListener("load", successFn, false)
    xhr.addEventListener("error", errorFn, false)
    xhr.addEventListener("abort", errorFn, false)
  
    fd.append('file', param.file)
    console.log(param.file);
    xhr.open('POST', serverURL, true)
    xhr.send(fd)
  }

export default class ArticleEditor extends React.Component {

  state = {
      editorState: null,
      title: null,
  }

    componentDidMount () {
    // 假设此处从服务端获取html格式的编辑器内容
    // const htmlContent = await fetchEditorContent()
    // 使用BraftEditor.createEditorState将html字符串转换为编辑器需要的editorState数据
    // this.setState({
    //   editorState: BraftEditor.createEditorState(htmlContent)
    // })
    window.onbeforeunload=function(e){
        　　var e = window.event||e;
        　　e.returnValue=("确定离开当前页面吗？");
        } 
  }

//   componentWillUnmount () {
//     notification['info']({
//         message: '你正在离开当前页面',
//         description: '你还未保存文章信息，请确认是否要保存',
//       });
//   }
//   myUpload = (param) => {
//       console.log(param.file)
//     Axios.post('/Uploads/text', {
//         img: param
//     }).then((mes)=>{
//         param.success({
//             url: mes.data.url,
//         })
//     })
//   }

  submitContent = () => {
    // 在编辑器获得焦点时按下ctrl+s会执行此方法
    // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
    const htmlContent = this.state.editorState.toHTML();
    let isnull = false;
    for (const key in this.state) {
        if (this.state.hasOwnProperty(key)) {
            const element = this.state[key];
            if(!element) {
                if(key === 'title') {
                    notification['error']({
                        message: '文章标题不能为空',
                        description: '请添加文章标题',
                    });
                    isnull = true;
                    break;
                }
            }
        }
    }
    if(isnull) {
        return;
    }

    Axios.post('/textback', {
        title: this.state.title,
        content: htmlContent,
    }).then((message)=>{
        if(message.status == 200) {
            notification['success']({
              message: '发表成功',
              description: '您已成功发表文章，可以在微信首页进行查看',
            });
        }
    }).catch((e)=>{
        notification['error']({
            message: '发表失败',
            description: '服务器错误，请稍后再试',
          });
    })
  }

  handleEditorChange = (editorState) => {
    this.setState({ editorState })
  }

  handleChange = (e) => {
    this.setState({
        title: e.target.value
    })
  }

  render () {
    const { editorState } = this.state

    return (
        <div>
            <div style={{margin: '10px 0'}}>
                <Input addonBefore="文章标题" defaultValue="" value={this.state.title} onChange={this.handleChange} />
            </div>
            <div className="my-component">
              <BraftEditor
                value={editorState}
                media={{uploadFn: uploadFn}}
                onChange={this.handleEditorChange}
                onSave={this.submitContent}
              />
            </div>
            <div style={{margin: '10px 0' }}>
                <Button type="primary" size="large" onClick={this.submitContent} block>发表文章</Button>
            </div>
        </div>
    )
  }
}