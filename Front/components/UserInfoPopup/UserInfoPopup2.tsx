import style from "../../styles/addUser.module.css";
import { useState, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { update_test } from "../../redux/sizes";
import Link from "next/link";
const CinFormation2 = (props: any) => {
  const [valid, setValid] = useState<number>(0);
  const [image, setImage] = useState<any>();
  const [userName, setUserName] = useState<string>("");
  const [file, setFile] = useState<any>([]);
  const changeStyle = useRef(null);
  const dispatch = useDispatch();
  const router = useRouter();


  const handelChange = (e: any) => {
    let lent: string = e.target.value;
    if (lent.length >= 6 && lent.length <= 11) {
      setValid(1);
      setUserName(e.target.value);
    } else setValid(2);
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
  let putfile = (e: any) => {
    var reader = new FileReader();
    var file = document.querySelector("input[type=file]") as HTMLInputElement;
    setFile(e.files);
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

  const handelSubmit = async (e: any) => {
    e.preventDefault();
    dispatch(update_test());
    const data = new FormData();
    let dataUserName:any;
    if (userName === "")
    {
      dataUserName = {userName: props.data?.userName}
    }
    else
      dataUserName = {userName};
    if (file.length < 1)
      data.append("image", props.data?.picture);
    else
      data.append("image", file[0]);

    props.setPopup(!props.Popup);
    props.socket?.emit("changeUserName", dataUserName);
    props.setRefresh(!props.refresh);
    if (file.length >= 1)
    {
      axios
      .post(
      `http://${process.env.NEXT_PUBLIC_IP_ADRESSE}:${process.env.NEXT_PUBLIC_PORT}/upload`,
      data,
        {
          headers: {
            Authorization: `Bearer ${
              localStorage.getItem("accessToken") as string
            }`,
          },
        }
      ).then((res) => {
            axios.post(`http://${process.env.NEXT_PUBLIC_IP_ADRESSE}:${process.env.NEXT_PUBLIC_PORT}/users/profile`,null,
            {headers: {Authorization: `Bearer ${localStorage.getItem("accessToken") as string}`,},})
            .then((res) => {
                props.setData(res.data.userInfo);;
              })
            .catch(function (error){
                if (error.response){
                   router.push({pathname :`/errorPage/${error.response.status}`})
                } 
            })
      })
      .catch(function (error) {
        if (error.response) {
          router.push({pathname :`/errorPage/${error.response.status}`})
        }
      });
    };
  }
    return (
    <>
      <div className={style.container}>
        <div className={style.row0}>
          <div className={style.row}>
            <p className={style.text1}>
            Please upload an avatar (if not a default avatar will be set)
            </p>
          </div>
          <form
            className={style.form}
            onSubmit={(e: any) => {
              e.preventDefault();
            }}
          >
            <div className={style.content}>
              <div className={style.imge}>
                <img
                  className={style.img}
                  src={image === undefined ? props.data?.picture : image}
                ></img>
              </div>
              <div className={style.child}>
                <p className={style.text2}>
                  you should be able to upload an avatar
                </p>
                <input
                  style={{ display: "none" }}
                  type="file"
                  id="file"
                  onChange={(e) => putfile(e.target)}
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
                <input
                  ref={changeStyle}
                  className={
                    valid == 1
                      ? style.inptvalid
                      : valid == 2
                      ? style.inptInvalid
                      : style.inpt
                  }
                  placeholder="UserName"
                  onChange={(e) => handelChange(e)}
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
              </div>
            </div>
            <button className={style.subm} onClick={handelSubmit}>
              Register
            </button>
          </form>
        </div>
          <Link href={'/twofactor'}><button className={style.ActiveAuth}>2FA</button></Link>
      </div>
    </>
  );
};

export default CinFormation2;
