import style from "../../styles/addUser.module.css";
import { useState, useRef } from "react";
import imagee from "../../public/images/profile.jpg";
// import { AiFillCloseCircle } from "react-icons/ai";
import axios from 'axios';

function getUserInfoPopup() {
  const [close, setClose] = useState<boolean>(true);
  const [valid, setValid] = useState<number>(0);
  const [image, setImage] = useState<string | undefined>(imagee.src);
  const changeStyle = useRef(null);

  const handelClick = () => {
    setClose(false);
  };
  const handelChange = (e: any) => {
    let lent: string = e.target.value;
    if (lent.length >= 6 && lent.length <= 9) setValid(1);
    else setValid(2);
    // console.log(e.target.value);
    // axios.post("10.12.11.3/complet", e.target.value);

  };

  function checkimage(src: any) {
    return new Promise((resolve) => {
      const newImage = new Image();
      const typeImage =
        src.search(/data:image\/+/, "") > -1 && src.search(/[;][ -~]+/) > -1
          ? src
              .replace(/[data:image/]+/, "")
              .replace(/[;][ -~]+/, "")
              .toLowerCase()
          : null;
      const base64Data =
        src.search(/^[data:image/]+([jpg]|[png]|[jpeg]|[gif])+[;]/) > -1
          ? src.replace(/^[data:image/]+([jpg]|[png]|[jpeg]|[gif])+[;]/, "")
          : null;
      if (typeImage && base64Data) {
        newImage.src = src;
        newImage.onload = () => resolve(true);
        newImage.onerror = () => resolve(false);
      } else resolve(false);
    });
  }

  let put = (e: any) => {
    var reader = new FileReader();
    var file = document.querySelector("input[type=file]") as HTMLInputElement;

    reader.onloadend = () => {
      checkimage(reader.result).then((res) => {
        if (res == true) {
          setImage(reader.result?.toString());
        } else {
          alert("Image invalid");
        }
      });
    };
    if (file) {
      let image_: FileList | null = file.files;
      if (image_ && image_.length > 0) {
        if (image_[0].name != undefined) {
          var ext = image_[0].name.split(".").pop();
          if (ext === "png" || ext === "jpg" || ext === "jpeg")
            reader.readAsDataURL(image_[0]);
          else alert("Image type invalid");
        }
      }
    }
  };
  // useEffect(() => {
  //   if (changeStyle.current){
  //     var input:HTMLInputElement = changeStyle.current
  //     input.classList.remove('inptInvalid')
  //     input.classList.add('inpt')
  //   }
  //   console.log(1)
  // }, []);
  // console.log(2)
  const handleClick = (e: any) => {
    e.preventDefault();
    // axios.post("10.12.11.3:3000/", )
    console.log(e.target.userName.value);
    axios({
      method: 'post',
      url: 'http://10.12.11.3:3000/users/complet',
      data: {
        userName: `${e.target.userName.value}`
      }
    });
  }
  return (
    <>
      {close && (
        <div className={style.container}>
          <div className={style.row0}>
            <div className={style.row}>
              <p className={style.text1}>
                The user should be able to upload an avatar. If the user doesn’t
                upload an avatar.
              </p>
            </div>
            <div className={style.form}>
              <div className={style.content}>
                <div className={style.imge}>
                  <img className={style.img} src={image}></img>
                </div>
                <div className={style.child}>
                  <p className={style.text2}>
                    should be able to upload an avatar
                  </p>
                  <input
                    style={{ display: "none" }}
                    type="file"
                    id="file"
                    onChange={(e) => put(e.target)}
                  />
                  <label htmlFor="file">
                    <div className={style.Btn}>
                      <p className={style.Pavatar}>Chose Avatar</p>
                    </div>
                  </label>
                </div>
              </div>
              <div className={style.row1}>
                <p className={style.text3}>Please Add Your UserName</p>
                <div>
                  <form action="" onSubmit={handleClick}>

                  <input ref={changeStyle}
                    className={
                      valid == 1
                      ? style.inptvalid
                      : valid == 2
                      ? style.inptInvalid
                      : style.inpt
                    }
                    placeholder="UserName"
                    id="userName"
                    // onChange={(e) => handelChange(e)}
                    onSubmit={handleClick}
                    ></input>
                  {valid == 2 ? (
                    <p className={style.error}>
                      Username Should Be Between 6 and 9 characters
                    </p>
                  ) : valid == 1 ? (
                    <p className={style.ValidText}>Successful UserName</p>
                    ) : (
                      ""
                      )}
                      </form>
                </div>
              </div>
            </div>
          </div>
          {valid == 1 && (
            <button type="submit" className={style.subm}>
              Register
            </button>
          )}
        </div>
      )}
    </>
  );
}

export default getUserInfoPopup;
