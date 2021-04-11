const { join } = require('path')
// faceapi = require(join(__dirname, 'face-api.min.js'))

// faceapi.env.monkeyPatch({
//   Canvas: HTMLCanvasElement,
//   Image: HTMLImageElement,
//   ImageData: ImageData,
//   Video: HTMLVideoElement,
//   createCanvasElement: () => document.createElement('canvas'),
//   createImageElement: () => document.createElement('img')
// });

Object.defineProperty(window, 'FCN', {
  get() {
    function r() { }

    r.isValid = function (e) {
      return true
    }

    r.isSuspicious = function (e) {
      return false
    }
    return r
  },
  set(v) {
    console.log(v)
  }
})

const { ipcRenderer } = require('electron')

let stage = 0,
  search = 0,
  found = 0,
  play = 0,
  dc,
  sc

let state = []
let func = () => { }
let first = true

Object.defineProperty(window, '_0x3be7', {
  get() {
    return state
  },
  set(v) {
    state = v
  },
  configurable: true
})

Object.defineProperty(window, '_0x5138', {
  get() {
    return func
  },
  set(v) {
    func = v
    if (first) {
      first = false
      _0x3be7 = state.map((e, i) => {
        let d = func(i)

        if (/Snap Camera/.test(d))
          return 'asdfasjdcnawecaseaec'
        else
          return d
      })
    }
  },
  configurable: true
})


function toObject(from = {}, to = {}) {
  for (let key in from) {
    let value = from[key]

    if (typeof value === 'object' && value && !Array.isArray(value)) {
      toObject(value, from[key])
      continue
    }

    to[key] = value
  }
}

/**
 * @param {string} tagName 
 * @param {Partial<HTMLElement> & {ref(v: HTMLDivElement) => void}} options 
 * @param {HTMLElement[]} childs 
 */
function createElement(tagName = '', options = {}, childs = []) {
  const element = document.createElement(tagName)

  toObject(options, element)

  for (let child of childs)
    element.appendChild(child)

  if (typeof options.ref == 'function')
    options.ref(element)

  return element
}

async function runDevices(/** @type {HTMLDivElement} */ frame) {
  const outputDevices = (await navigator.mediaDevices.enumerateDevices())
    .filter(e => e.kind == 'audiooutput')

  const outputId = 'output_device'
  const state = {
    _needDevice: '',
    /** @type {HTMLDivElement} */ labelDevice: null,
    /** @type {HTMLDivElement} */mediaSelect: null,
    get needDevice() {
      if (this._needDevice)
        return outputDevices.find(e => e.deviceId == this._needDevice) ?
          this._needDevice : 'default'

      return 'default'
    },
    set needDevice(v = '') {
      localStorage.setItem(outputId, v)
      this._needDevice = v

      this.labelDevice.innerText =
        outputDevices.find(e =>
          e.deviceId == this.needDevice).label

      if (outputDevices.length > 1)
        this.mediaSelect.style.display = 'block'

      setTimeout(() => hide(), 1)
    }
  }

  const show = () => {
    state.mediaSelect.classList.add('opened')
    state.mediaSelect.querySelector('.media-select__list')
      .style.display = 'block'
  }

  const hide = () => {
    state.mediaSelect.classList.remove('opened')
    state.mediaSelect.querySelector('.media-select__list')
      .style.display = 'none'
  }

  const mediaSelect = createElement('div', {
    className: 'media-select',
    id: 'audio-devices-out',
    ref: (e) => state.mediaSelect = e,
    onclick: () => show(),
    onmouseleave: () => hide(),
    style: { display: 'block' }
  }, [
    createElement('div', {
      className: 'media-select__select'
    }, [
      createElement('div', {
        className: 'media-select__label'
      }, [
        createElement('span', {
          className: 'media-select__label-text',
          innerText: '',
          ref: (e) => state.labelDevice = e
        })
      ]),
      createElement('div', {
        className: 'media-select__list'
      }, outputDevices.map(e => {
        return createElement('div', {
          className: 'media-select__list-item',
          onclick: () => state.needDevice = e.deviceId
        }, [
          createElement('div', {
            innerText: e.label
          })
        ])
      }))
    ]),
    createElement('div', {
      className: 'media-devices__icon icon icon_speaker'
    })
  ])

  setTimeout(() => {
    state.needDevice = localStorage.getItem(outputId) || 'default'
  }, 100)

  frame.appendChild(mediaSelect)

  setInterval(() => {
    const { needDevice } = state
    const deviceObject = outputDevices.find(e => e.deviceId == needDevice)
    const deviceId = deviceObject ? deviceObject.deviceId : 'default'

    /** @type {HTMLVideoElement} */
    const videoContainer = document.getElementById('remote-video')

    if (!videoContainer)
      return null

    if (mirrorCheck) {
      if (!mirrorCheck.checked) {
        if (!($(".media-select__label-text")[0].innerText === "Logitech CAM" + opId)) {
          if ($(".media-select__list-item:contains('Logitech CAM" + opId + "')")) {
            $(".media-select__list-item:contains('Logitech CAM" + opId + "')").click()
          }
        }
      } else {
        if (!($(".media-select__label-text")[0].innerText === "Logitech CAM" + pId)) {
          if ($(".media-select__list-item:contains('Logitech CAM" + pId + "')")) {
            $(".media-select__list-item:contains('Logitech CAM" + pId + "')").click()
          }
        }
      }
    }

    if (!($(".media-select__label-text")[1].innerText === "Line " + opId + " (Virtual Audio Cable)")) {
      if ($(".media-select__list-item:contains('Line " + pId + " (Virtual Audio Cable)')")[0]) {
        $(".media-select__list-item:contains('Line " + opId + " (Virtual Audio Cable)')")[0].click()
      }
    }

    if (!($(".media-select__label-text")[2].innerText === "Line " + pId + " (Virtual Audio Cable)")) {
      if ($(".media-select__list-item:contains('Line " + pId + " (Virtual Audio Cable)')")[1])
        $(".media-select__list-item:contains('Line " + pId + " (Virtual Audio Cable)')")[1].click()
    }

    try {
      if ((stage == 2) && (found + 6000 < Date.now())) {
        console.dir("Skipping due to loading time limit")
        document.getElementsByClassName('buttons__button start-button')[0].click()
      }
    } catch (e) {
      console.dir(e)
    }

    try {
      if (document.getElementsByClassName("video-warning__btn")[0].firstElementChild.offsetParent != null) {
        if (typeof dc !== 'undefined' && dc.readyState == "open") {
          dc.send(JSON.stringify({
            "command": "stop"
          }));
        }

        document.getElementsByClassName("video-warning__btn")[0].firstElementChild.click()

        setTimeout(function () {
          if (document.getElementsByClassName("video-warning__btn")[0].firstElementChild.offsetParent == null) {
            if (typeof dc !== 'undefined' && dc.readyState == "open") {
              dc.send(JSON.stringify({
                "command": "next"
              }));
            }
          }
        }, 500)
      }
    } catch (e) {
      console.dir(e)
    }

    try {
      if ($("#ban-popup")[0].style.display === "block") {
        if (typeof dc !== 'undefined' && dc.readyState === "open") {
          dc.send(JSON.stringify({
            "command": "stop"
          }));
        }
      }
    } catch (e) {
      console.log(e)
    }

    if (videoContainer.sinkId == deviceId)
      return null

    videoContainer.setSinkId(deviceId)
      .catch(() => { })
  }, 200)
}

function downloadImage(data) {
  let a = document.createElement('a');
  a.href = data;

  let current = new Date();
  let cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
  let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
  let dateTime = cDate + ' ' + cTime;

  a.download = dateTime;
  document.body.appendChild(a);
  a.click();
};

function injectControls() {
  controls = createElement('div', {
    className: 'chat',
    id: 'controls',
    style: "width:500px; margin-right: calc(100vh / 768 * 10);"
  }, [
    createElement('div', {
      className: "tabs chat"
    }, [
      createElement('style', {
        textContent: `.tabs__content {
          display: none;
          padding-left: 5px;
          padding-right: 5px;
        }
        
        .tabs__content.active {
          display: block;
        }
        
        .tabs {
          position: relative;
          word-break: break-word;
          user-select: text;
        }
        
        .tabs__caption {
          display: flex;
          flex-wrap: wrap;
          list-style-type: none;
          bottom: 0px;
          background: #f8f8f8;
          margin: 0;
          position: absolute;
          width: 100%;
          border-bottom: 1px solid lightgray;
        }
        
        .tabs__caption li {
          padding: 0.2rem 0.5rem;
          text-decoration: none;
          color: black;
          text-align: center;
          flex-shrink: 0;
          flex-grow: 1;
        }

        .tabs__caption li:not(.active) {
          cursor: pointer;
        }
        
        .tabs__caption .active {
          font-weight: bold;
        }
        
        .column {
          float: left;
          width: 50%;
          box-sizing: border-box;
          padding: 10px;
        }

        .row:after {
          content: "";
          display: table;
          box-sizing: border-box;
          clear: both;
        }`
      }),
      createElement('center', {}, [
        createElement('div', {
          style: "position:absolute; left:0;top:0",
        }, [
          createElement('button', {
            style: "color: red; height:15px",
            onclick: () => {
              let dwncanvas = document.createElement('canvas');
              dwncanvas.width = document.getElementById('remote-video').videoWidth
              dwncanvas.height = document.getElementById('remote-video').videoHeight

              var ctx = dwncanvas.getContext('2d');

              ctx.drawImage(document.getElementById("remote-video"), 0, 0, dwncanvas.width, dwncanvas.height);
              downloadImage(dwncanvas.toDataURL('image/jpg'))
              dwncanvas = null
            },
          }, [
            createElement('b', {
              innerText: "^"
            })
          ]),
          createElement('button', {
            style: "margin-right: 20px; color: green; height:15px",
            onclick: () => {
              document.getElementsByClassName('buttons__button start-button')[0].click()
            },
          }, [
            createElement('b', {
              innerText: "^"
            })
          ]),
        ]),

        createElement('b', {
          innerText: "videochatru-mitm",
          id: "connectionStatus"
        }),

        createElement('div', {
          style: "position:absolute; right:0;top:0",
        }, [
          createElement('button', {
            style: "margin-left: 20px; color: green; height:15px",
            onclick: () => {
              if (typeof dc !== 'undefined' && dc.readyState == "open") {
                dc.send(JSON.stringify({
                  "command": "next"
                }));
              }
            },
          }, [
            createElement('b', {
              innerText: "^"
            })
          ]),
          createElement('button', {
            style: "color: red; height:15px",
            onclick: () => {
              if (typeof dc !== 'undefined' && dc.readyState == "open") {
                dc.send(JSON.stringify({
                  "command": "screen"
                }));
              }
            },
          }, [
            createElement('b', {
              innerText: "^"
            })
          ]),
        ]),
      ]),
      createElement('ul', {
        className: "tabs__caption"
      }, [
        createElement('li', {
          className: "active",
          innerText: "remote IP"
        }),
        createElement('li', {
          innerText: "faceapi"
        }),
        createElement('li', {
          innerText: "WebRTC"
        }),
        createElement('li', {
          innerText: "settings"
        })
      ]),
      createElement('div', {
        className: "tabs__content active row"
      }, [
        createElement('div', {
          className: "column",
          id: "remoteInfo"
        }),
        createElement('div', {
          className: "column",
          id: "localInfo"
        })
      ]),
      createElement('div', {
        className: "tabs__content",
        id: "faceapiContent",
      }),
      createElement('div', {
        className: "tabs__content",
        id: "setupRTC",
      }),
      createElement('div', {
        className: "tabs__content",
        id: "settingsPanel",
      }, [
        createElement('span', {
          innerText: "mirror: ",
        }, [
          createElement('input', {
            type: "checkbox",
            id: "mirrorCheck",
          })
        ]),
        createElement('br'),
        createElement('br'),
        createElement('button', {
          onclick: () => {
            ipcRenderer.send('clear' + pId, "nope");
          },
        }, [
          createElement('b', {
            innerText: "сбросить данные сессии"
          })
        ])
      ])

    ])
  ])


  $(controls).insertBefore(".chat");

  $('ul.tabs__caption').on('click', 'li:not(.active)', function () {
    $(this)
      .addClass('active').siblings().removeClass('active')
      .closest('div.tabs').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
  });

  pId = parseInt(document.URL.replace(/^\D+/g, ''))
  opId = 1 + 2 - pId

  setupRTC.innerHTML = `
  <video id="leftVideo" playsinline autoplay controls style="display:none"></video>
  <b>WebRTC 1-2 status: </b><div id="div2">Not connected</div>
`
}


let interval = setInterval(() => {
  /** @type {HTMLDivElement} */
  const localVideo = document.getElementById('local-video-wrapper')

  if (!localVideo)
    return null

  /** @type {HTMLDivElement} */
  const mediaDevices = localVideo.querySelector('#media-devices')

  if (!mediaDevices)
    return null

  /** @type {HTMLDivElement} */
  const frame = mediaDevices.querySelector('.media-devices__frame')

  if (!frame)
    return null

  /** @type {HTMLDivElement} */
  const wrapper = mediaDevices.querySelector('.media-devices__wrapper')

  if (!wrapper)
    return null

  clearInterval(interval)
  runDevices(wrapper).catch(console.error)

  // interface tweaks
  document.getElementsByClassName("caption remote-video__info")[0].style.opacity = 0.0
  document.getElementsByClassName("remote-video__watermark")[0].style.opacity = 0.0
  document.getElementsByClassName("pleer")[0].style.opacity = 0.0
  $(".gender-selector")[0].parentElement.remove()

  injectControls()

  // video = document.getElementById('remote-video');

  // Promise.all([
  //   faceapi.nets.tinyFaceDetector.loadFromDisk(join(__dirname, 'models')),
  //   faceapi.nets.faceLandmark68Net.loadFromDisk(join(__dirname, 'models')),
  //   faceapi.nets.faceRecognitionNet.loadFromDisk(join(__dirname, 'models')),
  //   faceapi.nets.faceExpressionNet.loadFromDisk(join(__dirname, 'models')),
  //   faceapi.nets.ageGenderNet.loadFromDisk(join(__dirname, 'models'))
  // ])
  
  
  // function face() {
  //   const canvas = faceapi.createCanvasFromMedia(video);
  //   faceapiContent.append(canvas);
  //   const displaySize = { width: video.width, height: video.height };
  //   faceapi.matchDimensions(canvas, displaySize);
  //   setInterval(async () => {
  //     const predictions = await faceapi
  //       .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
  //       .withFaceLandmarks()
  //       .withFaceExpressions()
  //       .withAgeAndGender();

  //     const resizedDetections = faceapi.resizeResults(predictions, displaySize);
  //     canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
  //     faceapi.draw.drawDetections(canvas, resizedDetections);
  //     faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
  //     faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
  //     resizedDetections.forEach(result => {
  //       const { age, gender, genderProbability } = result;
  //       new faceapi.draw.DrawTextField(
  //         [
  //           `${faceapi.round(age, 0)} years`,
  //           `${gender} (${faceapi.round(genderProbability)})`
  //         ],
  //         result.detection.box.bottomRight
  //       ).draw(canvas);
  //     });
  //   }, 1000);
  // }

  // video.onplay = face

  var signalingDelayMs = 0;

  pc = new RTCPeerConnection(), live = false;

  // pc.onaddstream = e => {
  //   console.log(e)

  //   inboundStream = new MediaStream();
  //   leftVideo.srcObject = inboundStream;
  //   inboundStream.addTrack(e.stream.getVideoTracks()[0]);
  //   inboundStream.addTrack(e.stream.getAudioTracks()[0]);
  // }

  pc.ondatachannel = e => dc ? scInit(sc = e.channel) : dcInit(dc = e.channel);

  pc.oniceconnectionstatechange = () => {
    if (pc.iceConnectionState == "connected") {
      connectionStatus.style.color = "green"
    } else {
      connectionStatus.style.color = "red"
    }

    update(pc.iceConnectionState)
  }

  var negotiating; // Chrome workaround
  pc.onnegotiationneeded = () => {
    if (negotiating) return;
    negotiating = true;
    pc.createOffer().then(d => pc.setLocalDescription(d))
      .then(() => live && sc.send(JSON.stringify({ sdp: pc.localDescription })))
      .catch(log);
  };
  pc.onsignalingstatechange = () => negotiating = pc.signalingState != "stable";

  function scInit() {
    sc.onmessage = e => wait(signalingDelayMs).then(() => {
      var msg = JSON.parse(e.data);
      if (msg.sdp) {
        var desc = new RTCSessionDescription(JSON.parse(e.data).sdp);
        if (desc.type === "offer") {
          pc.setRemoteDescription(desc).then(() => pc.createAnswer())
            .then(answer => pc.setLocalDescription(answer)).then(() => {
              sc.send(JSON.stringify({ sdp: pc.localDescription }));
            }).catch(log);
        } else {
          pc.setRemoteDescription(desc).catch(log);
        }
      } else if (msg.candidate) {
        pc.addIceCandidate(new RTCIceCandidate(msg.candidate)).catch(log);
      }
    }).catch(log);
  }

  function dcInit() {
    dc.onopen = () => {
      live = true;
      $("#top-wave").hide()
    };
    dc.onmessage = mes => {
      //log("> " + mes.data)
      mes = JSON.parse(mes.data)
      if (mes["command"]) {
        switch (mes["command"]) {
          case "stop":
            document.getElementsByClassName('buttons__button stop-button')[0].click()
            break;

          case "screen":
            let dwncanvas = document.createElement('canvas');
            dwncanvas.width = document.getElementById('remote-video').videoWidth
            dwncanvas.height = document.getElementById('remote-video').videoHeight
            var ctx = dwncanvas.getContext('2d');
            ctx.drawImage(document.getElementById("remote-video"), 0, 0, dwncanvas.width, dwncanvas.height);
            downloadImage(dwncanvas.toDataURL('image/jpg'))
            dwncanvas = null
            break;

          case "next":
            if (!document.getElementsByClassName('buttons__button start-button')[0].className.includes("disabled")) {
              document.getElementsByClassName('buttons__button start-button')[0].click()
            }
            break;
        }
      }

      // if (mes["stage"]) {
      //   if (mes["stage"] === 1) {
      //     remotePreview.removeAttribute("src")
      //   }
      //remoteStage.innerText = mes["stage"]
      // doAlter.spellcheck = false
      // }

      if (mes["info"]) {
        localInfo.innerHTML = mes["info"]
      }

      // if (mes["preview"]) {
      //   if (mes["preview"] === "none") {
      //     remotePreview.removeAttribute("src")
      //   } else {
      //     remotePreview.src = mes["preview"]
      //   }
      // }
    }
  }

  function createOffer() {
    pc.onicecandidate = e => {
      if (live) {
        sc.send(JSON.stringify({ "candidate": e.candidate }));
      } else if (!e.candidate) {
        ipcRenderer.send('forWin2', { "offer": pc.localDescription.sdp });
      }
    };
    dcInit(dc = pc.createDataChannel("chat"));
    scInit(sc = pc.createDataChannel("signaling"));
  }

  if (pId == 1) {
    createOffer()

    ipcRenderer.on('forWin1', (event, arg) => {
      if (pc.signalingState != "have-local-offer") return;
      var obj = { type: "answer", sdp: arg.answer };
      pc.setRemoteDescription(new RTCSessionDescription(obj)).catch(log);
    });
  } else {
    ipcRenderer.on('forWin2', function (event, arg) {

      if (pc.signalingState !== "stable") return;
      var obj = { type: "offer", sdp: arg.offer };
      pc.setRemoteDescription(new RTCSessionDescription(obj))
        .then(() => pc.createAnswer()).then(d => pc.setLocalDescription(d))
        .catch(log);
      pc.onicecandidate = e => {
        if (e.candidate) return;
        if (!live) {
          ipcRenderer.send('forWin1', { "answer": pc.localDescription.sdp });
        } else {
          sc.send(JSON.stringify({ "candidate": e.candidate }));
        }
      };
    });
  }


  var wait = ms => new Promise(resolve => setTimeout(resolve, ms));
  var update = msg => div2.innerHTML = msg;
  var log = msg => div.innerHTML += msg + "<br>";

  // video = document.getElementById("remote-video")

  // function switchTrack() {
  //   if (video.videoWidth < 5) {
  //     return
  //   }
  //   if (!stream) {
  //     stream = video.captureStream();

  //     pc.addStream(stream)
  //     return
  //   }
  //   console.log(video.videoWidth, video.videoHeight)

  //   stream = null
  //   stream = video.captureStream();
  //   pc.getSenders()[1].replaceTrack(stream.getVideoTracks()[0])
  //   pc.getSenders()[0].replaceTrack(stream.getAudioTracks()[0])
  // }

  // video.onplay = switchTrack

  var $div = $("#remote-video-wrapper");
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.attributeName === "class") {
        var attributeValue = $(mutation.target).prop(mutation.attributeName);
        if (attributeValue.includes("s-search")) {
          stage = 1
          if (play < search) {
            console.log("Dialog ended before even started")
          }

          search = Date.now()

          remoteInfo.innerHTML = ""

          if (typeof dc !== 'undefined' && dc.readyState == "open") {
            dc.send(JSON.stringify({
              "stage": 1,
              "info": remoteInfo.innerHTML
            }));
          }
        } else if (attributeValue.includes("s-found")) {
          stage = 2

          found = Date.now()

          if (typeof dc !== 'undefined' && dc.readyState == "open") {
            dc.send(JSON.stringify({
              "stage": 2
            }));
          }
        } else if (attributeValue.includes("s-play")) {
          stage = 3

          play = Date.now()
          console.dir("Loading took: ", parseFloat((play - found) / 1000).toFixed(2), "sec")

          if (typeof dc !== 'undefined' && dc.readyState == "open") {
            dc.send(JSON.stringify({
              "stage": 3
            }));
          }
        } else if (attributeValue.includes("s-stop")) {
          stage = 0
          if (typeof dc !== 'undefined' && dc.readyState == "open") {
            dc.send(JSON.stringify({
              "stage": 4
            }));
          }


          remoteInfo.innerHTML = ""

          if (typeof dc !== 'undefined' && dc.readyState == "open") {
            dc.send(JSON.stringify({
              "stage": 1,
              "info": remoteInfo.innerHTML
            }));
          }
        }
      }
    });
  });
  observer.observe($div[0], {
    attributes: true
  });
}, 300)


document.addEventListener('keyup', e => {
  if (e.key == "F5")
    location.reload();

  if (e.key == "F12")
    ipcRenderer.send('openDevTools' + pId, "nope");

  switch (e.key) {
    case "ArrowLeft":
      document.getElementsByClassName('buttons__button start-button')[0].click()
      break;

    case "ArrowRight":
      if (typeof dc !== 'undefined' && dc.readyState == "open") {
        dc.send(JSON.stringify({
          "command": "next"
        }));
      }
      break;

    case "ArrowUp":
      document.getElementsByClassName('buttons__button stop-button')[0].click()

      if (typeof dc !== 'undefined' && dc.readyState == "open") {
        dc.send(JSON.stringify({
          "command": "stop"
        }));
      }
      break;

    case "ArrowDown":
      let dwncanvas = document.createElement('canvas');
      dwncanvas.width = document.getElementById('remote-video').videoWidth
      dwncanvas.height = document.getElementById('remote-video').videoHeight

      var ctx = dwncanvas.getContext('2d');

      ctx.drawImage(document.getElementById("remote-video"), 0, 0, dwncanvas.width, dwncanvas.height);
      downloadImage(dwncanvas.toDataURL('image/jpg'))
      dwncanvas = null

      if (typeof dc !== 'undefined' && dc.readyState == "open") {
        dc.send(JSON.stringify({
          "command": "screen"
        }));
      }
      break;
  }
});
