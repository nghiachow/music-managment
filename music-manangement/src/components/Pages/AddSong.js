import React, {useState} from 'react'
import '../../stlye/AddSong.css'
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import "antd/dist/antd.css";

  function AddSong() {
    const [fileList, setFileList] = useState([
      {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: 'https://uphinh.vn/images/2022/03/14/8b7d9448bb9df292c4ae055221a25fde.png',
      },
    ]);
  
    const onChange = ({ fileList: newFileList }) => {
      setFileList(newFileList);
    };
    const onPreview = async file => {
      let src = file.url;
      if (!src) {
        src = await new Promise(resolve => {
          const reader = new FileReader();
          reader.readAsDataURL(file.originFileObj);
          reader.onload = () => resolve(reader.result);
        });
      }
      const image = new Image();
      image.src = src;
      const imgWindow = window.open(src);
      imgWindow.document.write(image.outerHTML);
    };

    const info = () => {
      message.success('Add song successfully');
    };

  return (
    <div className="container contact-form">
        <div className="contact-image">
          {/* <img src="https://uphinh.vn/images/2022/03/10/51ecf12c128812b7386c12a455db630f.png" /> */}
          <img src='https://uphinh.vn/images/2022/03/14/45c447df8d883ab462c24023ed1fffc2.png'/>
        </div>
        <form method="post">
          <h3>Add your Favorite Song</h3>
          <div className="row">
            <div className="col-md-7" style={{paddingTop:''}}>
              <div className="form-group">
                <input style={{margin:'4px'}} type="text" name="songName" className="form-control" placeholder="Name"  />
              </div>
              <div className="form-group">
                <input style={{margin:'4px'}} type="text" name="songGenre" className="form-control" placeholder="Genre" />
              </div>
              <div className="form-group">
                <input style={{margin:'4px'}} type="text" name="ArtistName" className="form-control" placeholder="ArtistName "  />
              </div>
              <div style={{marginLeft:'5px'}} className="form-group">
              <Button style={{borderRadius:'4px'}} type="primary" onClick={info}>
                Add Your Song
              </Button>,
              </div>
            </div>
            <div className="col-md-5">
              <div className="form-group">
                <ImgCrop rotate>
                  <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={fileList}
                    onChange={onChange}
                    onPreview={onPreview}
                    style={{height:'40px'}}
                  >       
                    {fileList.length < 5 && '+ Upload'}
                  </Upload>
                </ImgCrop>
                <div className="form-group">
                  <input style={{width:'90%'}} type="text" name="ArtistName" className="form-control" placeholder="Audio Url "  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
  )
}

export default AddSong