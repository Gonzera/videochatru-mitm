const { join } = require('path')

require(join(__dirname, 'bad_words.js'))

require(join(__dirname, 'ws_hacks.js'))


function random_female() {
  return osk_adj_female[Math.floor(Math.random() * osk_adj_female.length)] + ' ' + osk_female[Math.floor(Math.random() * osk_female.length)]
}

function random_male() {
  return osk_adj_male[Math.floor(Math.random() * osk_adj_male.length)] + ' ' + osk_male[Math.floor(Math.random() * osk_male.length)]
}

window.addEventListener("DOMContentLoaded", function () {
  mapgl = require(join(__dirname, '2gis.js'))
}, false);

function triggerMouseEvent(node, eventType) {
  var clickEvent = document.createEvent('MouseEvents');
  clickEvent.initEvent(eventType, true, true);
  node.dispatchEvent(clickEvent);
}

function bridgeSend(message) {
  if (pId == 1) {
    ipcRenderer.send('dc2', message);
  } else {
    ipcRenderer.send('dc1', message);
  }
}

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
  sc,
  unmute_down = false,
  unmute_up = false,
  autoSettings = {}

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

    if (stopAutoSettings && !stopAutoSettings.checked) {
      if (mirrorCheck && typeof (autoSettings.cam) != "undefined" && autoSettings.cam != "") {
        if (!mirrorCheck.checked) {
          if (!($(".media-select__label-text")[0].innerText === autoSettings.cam)) {
            if ($(".media-select__list-item:contains('" + autoSettings.cam + "')")) {
              $(".media-select__list-item:contains('" + autoSettings.cam + "')").click()
            }
          }
        } else {
          if (typeof (autoSettings.mirror) != "undefined" && autoSettings.mirror != "") {
            if (!($(".media-select__label-text")[0].innerText === autoSettings.mirror)) {
              if ($(".media-select__list-item:contains('" + autoSettings.mirror + "')")) {
                $(".media-select__list-item:contains('" + autoSettings.mirror + "')").click()
              }
            }
          }
        }
      }

      if (typeof (autoSettings.mic) != "undefined" && autoSettings.mic != "") {
        if (!($(".media-select__label-text")[1].innerText === autoSettings.mic)) {
          if ($(".media-select__list-item:contains('" + autoSettings.mic + "')")[0]) {
            $(".media-select__list-item:contains('" + autoSettings.mic + "')")[0].click()
          }
        }
      }

      if (typeof (autoSettings.speaker) != "undefined" && autoSettings.speaker != "") {
        if (!($(".media-select__label-text")[2].innerText === autoSettings.speaker)) {
          if ($(".media-select__list-item:contains('" + autoSettings.speaker + "')")[0]) {
            $(".media-select__list-item:contains('" + autoSettings.speaker + "')")[0].click()
          }
        }
      }
    }

    try {
      if ((stage == 2) && (found + 4000 < Date.now())) {
        console.dir("Skipping due to loading time limit")
        document.getElementsByClassName('buttons__button start-button')[0].click()
      }
    } catch (e) {
      console.dir(e)
    }

    try {
      if (document.getElementsByClassName("video-warning__btn")[0].firstElementChild.offsetParent != null) {

        bridgeSend(JSON.stringify({
          "command": "stop"
        }));


        document.getElementsByClassName("video-warning__btn")[0].firstElementChild.click()

        setTimeout(function () {
          if (document.getElementsByClassName("video-warning__btn")[0].firstElementChild.offsetParent == null) {

            bridgeSend(JSON.stringify({
              "command": "next"
            }));

          }
        }, 500)
      }
    } catch (e) {
      console.dir(e)
    }

    try {
      if ($("#ban-popup")[0].style.display === "block") {

        bridgeSend(JSON.stringify({
          "command": "stop"
        }));

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
  if (data == "data:,")
    return
  let a = document.createElement('a');
  a.href = data;

  let current = new Date();
  let cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
  let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds() + "-" + current.getMilliseconds();
  let dateTime = cDate + ' ' + cTime;

  a.download = "videochatru_" + dateTime;
  document.body.appendChild(a);
  a.click();
};

function injectControls() {
  controls = createElement('div', {
    className: 'chat',
    id: 'controls',
    style: "width:450px; margin-right: calc(100vh / 768 * 10);"
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
      createElement('center', {
        style: "height: 24px; user-select: none; margin-bottom:2px"
      }, [
        createElement('div', {
          style: "position:absolute; left:0; top:0;",
        }, [
          createElement('button', {
            id: "leftScreen",
            style: "color: red; height:24px",
            onclick: () => {
              let dwncanvas = document.createElement('canvas');
              dwncanvas.width = document.getElementById('remote-video').videoWidth
              dwncanvas.height = document.getElementById('remote-video').videoHeight

              var ctx = dwncanvas.getContext('2d');

              ctx.drawImage(document.getElementById("remote-video"), 0, 0, dwncanvas.width, dwncanvas.height);
              downloadImage(dwncanvas.toDataURL('image/jpg'))
              dwncanvas = null

              leftScreen.style.backgroundColor = "#555555"
              sync()
              setTimeout(() => {
                leftScreen.style.backgroundColor = ""
                sync()
              }, 500)
            },
          }, [
            createElement('b', {
              innerText: "📥"
            })
          ]),
          createElement('button', {
            style: "height:24px",
            id: "leftMute",
            onclick: () => {
              document.getElementById('remote-video').muted = !document.getElementById('remote-video').muted
              if (document.getElementById('remote-video').muted) {
                remoteMuted.innerText = "🔇"
              } else {
                remoteMuted.innerText = "🔊"
              }

              leftMute.style.backgroundColor = "#555555"
              sync()
              setTimeout(() => {
                leftMute.style.backgroundColor = ""
                sync()
              }, 500)

              bridgeSend(JSON.stringify({
                "mute_status": document.getElementById('remote-video').muted
              }));
            },
            oncontextmenu: () => {
              ipcRenderer.send('SWITCH_A', true);
              ipcRenderer.send('SWITCH_B', true);
            }
          }, [
            createElement('b', {
              id: "remoteMuted",
              innerText: "🔊"
            })
          ]),
          createElement('button', {
            id: "leftSkip",
            style: "height:24px",
            onclick: () => {
              if (!document.getElementsByClassName('buttons__button start-button')[0].className.includes("disabled")) {
                document.getElementsByClassName('buttons__button start-button')[0].click()
                leftSkip.style.backgroundColor = "#555555"
                sync()
                setTimeout(() => {
                  leftSkip.style.backgroundColor = ""
                  sync()
                }, 500)
              }
            },
            oncontextmenu: () => {
              document.getElementsByClassName('buttons__button stop-button')[0].click()
              leftSkip.style.backgroundColor = "#555555"
              sync()
              setTimeout(() => {
                leftSkip.style.backgroundColor = ""
                sync()
              }, 500)
            }
          }, [
            createElement('b', {
              innerText: "⏩"
            })
          ]),
        ]),
        createElement('div', {
          style: `  display: block;
          margin-left: auto;
          margin-right: auto;`
        }, [
          createElement('button', {
            style: "height:24px",
            id: "leftDiscord",
            onmousedown: (e) => {
              if (e.button == 0) {
                if (pId == 1) {
                  ipcRenderer.send('DPTT_A', true);
                } else {
                  ipcRenderer.send('DPTT_B', true);
                }
              }
            },
            onmouseup: (e) => {
              if (e.button == 0) {
                if (pId == 1) {
                  ipcRenderer.send('DPTT_A', false);
                } else {
                  ipcRenderer.send('DPTT_B', false);
                }
              }
            },
            oncontextmenu: () => {
              if (pId == 1) {
                if (leftDiscord.style.backgroundColor) {
                  ipcRenderer.send('DPTT_A', false);
                } else {
                  ipcRenderer.send('DPTT_A', true);
                }
              } else {
                if (leftDiscord.style.backgroundColor) {
                  ipcRenderer.send('DPTT_B', false);
                } else {
                  ipcRenderer.send('DPTT_B', true);
                }
              }
            }
          }, [
            createElement('b', {
              innerText: "🤡"
            })
          ]),
          createElement('button', {
            style: "height:24px",
            id: "leftMusic",
            onclick: () => {
              if (pId == 1) {
                if (leftMusic.style.backgroundColor) {
                  ipcRenderer.send('MUSIC_A', false);
                } else {
                  ipcRenderer.send('MUSIC_A', true);
                }
              } else {
                if (leftMusic.style.backgroundColor) {
                  ipcRenderer.send('MUSIC_B', false);
                } else {
                  ipcRenderer.send('MUSIC_B', true);
                }
              }
            },
            oncontextmenu: () => {
              ipcRenderer.send('SWITCH_DISCORD', true);
            },
          }, [
            createElement('b', {
              innerText: "🎵"
            })
          ]),
          createElement('b', {
            innerText: "videochatru-mitm",
            style: "display: none",
            id: "connectionStatus"
          }),
          createElement('button', {
            style: "height:24px;",
            id: "leftMic",
            onmousedown: (e) => {
              if (e.button == 0) {
                if (pId == 1) {
                  ipcRenderer.send('PTT_A', true);
                } else {
                  ipcRenderer.send('PTT_B', true);
                }
              }
            },
            onmouseup: (e) => {
              if (e.button == 0) {
                if (pId == 1) {
                  ipcRenderer.send('PTT_A', false);
                } else {
                  ipcRenderer.send('PTT_B', false);
                }
              }
            },
            oncontextmenu: () => {
              if (pId == 1) {
                if (leftMic.style.backgroundColor) {
                  ipcRenderer.send('PTT_A', false);
                } else {
                  ipcRenderer.send('PTT_A', true);
                }
              } else {
                if (leftMic.style.backgroundColor) {
                  ipcRenderer.send('PTT_B', false);
                } else {
                  ipcRenderer.send('PTT_B', true);
                }
              }
            }
          }, [
            createElement('b', {
              innerText: "🎤"
            })
          ]),
          createElement('button', {
            style: "height:24px",
            id: "rightMic",
            onmousedown: (e) => {
              if (e.button == 0) {
                if (pId == 1) {
                  ipcRenderer.send('PTT_B', true);
                } else {
                  ipcRenderer.send('PTT_A', true);
                }
              }
            },
            onmouseup: (e) => {
              if (e.button == 0) {
                if (pId == 1) {
                  ipcRenderer.send('PTT_B', false);
                } else {
                  ipcRenderer.send('PTT_A', false);
                }
              }
            },
            oncontextmenu: () => {
              if (pId == 1) {
                if (rightMic.style.backgroundColor) {
                  ipcRenderer.send('PTT_B', false);
                } else {
                  ipcRenderer.send('PTT_B', true);
                }
              } else {
                if (rightMic.style.backgroundColor) {
                  ipcRenderer.send('PTT_A', false);
                } else {
                  ipcRenderer.send('PTT_A', true);
                }
              }
            }
          }, [
            createElement('b', {
              innerText: "🎤"
            })
          ]),
          createElement('button', {
            style: "height:24px",
            id: "rightMusic",
            onclick: () => {
              if (pId == 1) {
                if (rightMusic.style.backgroundColor) {
                  ipcRenderer.send('MUSIC_B', false);
                } else {
                  ipcRenderer.send('MUSIC_B', true);
                }
              } else {
                if (rightMusic.style.backgroundColor) {
                  ipcRenderer.send('MUSIC_A', false);
                } else {
                  ipcRenderer.send('MUSIC_A', true);
                }
              }
            },
            oncontextmenu: () => {
              ipcRenderer.send('SWITCH_DISCORD', true);
            },
          }, [
            createElement('b', {
              innerText: "🎵"
            })
          ]),
          createElement('button', {
            style: "height:24px",
            id: "rightDiscord",
            onclick: () => {
              //document.getElementsByClassName('buttons__button start-button')[0].click()
            },
            onmousedown: (e) => {
              if (e.button == 0) {
                if (pId == 1) {
                  ipcRenderer.send('DPTT_B', true);
                } else {
                  ipcRenderer.send('DPTT_A', true);
                }
              }
            },
            onmouseup: (e) => {
              if (e.button == 0) {
                if (pId == 1) {
                  ipcRenderer.send('DPTT_B', false);
                } else {
                  ipcRenderer.send('DPTT_A', false);
                }
              }
            },
            oncontextmenu: () => {
              if (pId == 1) {
                if (rightDiscord.style.backgroundColor) {
                  ipcRenderer.send('DPTT_B', false);
                } else {
                  ipcRenderer.send('DPTT_B', true);
                }
              } else {
                if (rightDiscord.style.backgroundColor) {
                  ipcRenderer.send('DPTT_A', false);
                } else {
                  ipcRenderer.send('DPTT_A', true);
                }
              }
            }
          }, [
            createElement('b', {
              innerText: "🤡"
            })
          ])
        ]),

        createElement('div', {
          style: "position:absolute; right:0; top:0;",
        }, [
          createElement('button', {
            id: "rightSkip",
            style: "height:24px",
            onclick: () => {
              bridgeSend(JSON.stringify({
                "command": "next"
              }));

              rightSkip.style.backgroundColor = "#555555"
              sync()
              setTimeout(() => {
                rightSkip.style.backgroundColor = ""
                sync()
              }, 500)
            },
            oncontextmenu: () => {
              bridgeSend(JSON.stringify({
                "command": "stop"
              }));
              rightSkip.style.backgroundColor = "#555555"
              sync()
              setTimeout(() => {
                rightSkip.style.backgroundColor = ""
                sync()
              }, 500)
            }
          }, [
            createElement('b', {
              innerText: "⏪"
            })
          ]),
          createElement('button', {
            style: "height:24px",
            id: "rightMute",
            oncontextmenu: () => {
              ipcRenderer.send('SWITCH_A', true);
              ipcRenderer.send('SWITCH_B', true);
            },
            onclick: () => {
              bridgeSend(JSON.stringify({
                "command": "mute"
              }));

              rightMute.style.backgroundColor = "#555555"
              sync()
              setTimeout(() => {
                rightMute.style.backgroundColor = ""
                sync()
              }, 500)
            },
          }, [
            createElement('b', {
              id: "localMuted",
              innerText: "🔊"
            })
          ]),
          createElement('button', {
            style: "color: red; height:24px",
            id: "rightScreen",
            onclick: () => {

              bridgeSend(JSON.stringify({
                "command": "screen"
              }));

              rightScreen.style.backgroundColor = "#555555"
              sync()
              setTimeout(() => {
                rightScreen.style.backgroundColor = ""
                sync()
              }, 500)
            },
          }, [
            createElement('b', {
              innerText: "📥"
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
          innerText: "map1"
        }),
        createElement('li', {
          innerText: "map2"
        }),
        createElement('li', {
          innerText: "osk"
        }),
        createElement('li', {
          innerText: "WebRTC"
        }),
        createElement('li', {
          innerText: "settings"
        })
      ]),
      createElement('div', {
        className: "tabs__content active row",
        id: "apiInfoContent",
        style: "height:100%;"
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
        id: "mapContent1",
        style: "height:100%;"
      }, [
        createElement('div', {
          id: "mapid1",
          style: "width: 100%"
        })
      ]),
      createElement('div', {
        className: "tabs__content",
        id: "mapContent2",
        style: "height:100%;"
      }, [
        createElement('div', {
          id: "mapid2",
          style: "width: 100%"
        })
      ]),
      createElement('div', {
        className: "tabs__content",
        id: "faceapiContent",
      }, [
        createElement('button', {
          id: "maleOsk",
          onclick: () => {
            maleOskText.innerText = random_male()
          },
        }, [
          createElement('b', {
            id: "maleOskText",
            innerText: "мужской род"
          })
        ]),
        createElement('br'),
        createElement('br'),
        createElement('button', {
          id: "femaleOsk",
          onclick: () => {
            femaleOskText.innerText = random_female()
          },
        }, [
          createElement('b', {
            id: "femaleOskText",
            innerText: "женский род"
          })
        ])
      ]),
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
        createElement('span', {
          innerText: "disable autosettings: ",
        }, [
          createElement('input', {
            type: "checkbox",
            id: "stopAutoSettings",
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

  buttonsDiv = $(".buttons")[0]
  chatDiv = $(".chat")[0]

  $(controls).insertBefore(".chat");
  $(".buttons")[0].style.marginLeft = "14px"

  resize = false

  setInterval(() => {
    if (typeof localTZ !== 'undefined' && typeof localTime !== 'undefined') {
      localTime.innerText = new Date().toLocaleTimeString("ru", { timeZone: localTZ.innerText }).slice(0, -3)
    }
    if (typeof remoteTZ !== 'undefined' && typeof remoteTime !== 'undefined') {
      remoteTime.innerText = new Date().toLocaleTimeString("ru", { timeZone: remoteTZ.innerText }).slice(0, -3)
    }
  }, 1000)

  map1 = new mapgl.Map('mapid1', {
    center: [39.2610736084446, 54.39525286954687],
    zoom: 10,
    lang: "ru",
    key: 'bfd8bbca-8abf-11ea-b033-5fa57aae2de7',
    style: 'c080bb6a-8134-4993-93a1-5b4d8c36a59b'
  });

  map2 = new mapgl.Map('mapid2', {
    center: [39.2610736084446, 54.39525286954687],
    zoom: 10,
    lang: "ru",
    key: 'bfd8bbca-8abf-11ea-b033-5fa57aae2de7',
    style: 'c080bb6a-8134-4993-93a1-5b4d8c36a59b'
  });

  function resizemap() {
    mapid1.style.height = $("#mapContent1")[0].offsetHeight - $(".tabs__caption")[0].offsetHeight + "px"
    mapid2.style.height = $("#mapContent2")[0].offsetHeight - $(".tabs__caption")[0].offsetHeight + "px"

    remoteInfo.style.height = $("#apiInfoContent")[0].offsetHeight - $(".tabs__caption")[0].offsetHeight + "px"

    map1.invalidateSize()
    map2.invalidateSize()
  }

  function outputsize() {
    resizemap()

    if (!resize) {
      resize = true
      setTimeout(() => {
        let mar = parseInt(window.getComputedStyle(controls).marginRight)
        buttonsDiv.style.width = (parseInt(buttonsDiv.style.width) - (parseInt(controls.style.width) + mar) / 2) + "px"
        chatDiv.style.width = (parseInt(chatDiv.style.width) - (parseInt(controls.style.width) + mar) / 2) + "px"
        resize = false
      }, 200)
    }
  }

  new ResizeObserver(outputsize).observe(document.getElementsByClassName("chat-container")[0])

  ipcRenderer.on('PTT_A', (event, arg) => {
    if (arg) {
      if (pId == 1) {
        leftMic.style.backgroundColor = "#555555"
      } else {
        rightMic.style.backgroundColor = "#555555"
      }
    } else {
      if (pId == 1) {
        leftMic.style.backgroundColor = ""
      } else {
        rightMic.style.backgroundColor = ""
      }
    }
    sync()
  });

  ipcRenderer.on('PTT_B', (event, arg) => {
    if (arg) {
      if (pId == 1) {
        rightMic.style.backgroundColor = "#555555"
      } else {
        leftMic.style.backgroundColor = "#555555"
      }
    } else {
      if (pId == 1) {
        rightMic.style.backgroundColor = ""
      } else {
        leftMic.style.backgroundColor = ""
      }
    }
    sync()
  });

  ipcRenderer.on('DPTT_A', (event, arg) => {
    if (arg) {
      if (pId == 1) {
        leftDiscord.style.backgroundColor = "#555555"
      } else {
        rightDiscord.style.backgroundColor = "#555555"
      }
    } else {
      if (pId == 1) {
        leftDiscord.style.backgroundColor = ""
      } else {
        rightDiscord.style.backgroundColor = ""
      }
    }
    sync()
  });

  ipcRenderer.on('DPTT_B', (event, arg) => {
    if (arg) {
      if (pId == 1) {
        rightDiscord.style.backgroundColor = "#555555"
      } else {
        leftDiscord.style.backgroundColor = "#555555"
      }
    } else {
      if (pId == 1) {
        rightDiscord.style.backgroundColor = ""
      } else {
        leftDiscord.style.backgroundColor = ""
      }
    }
    sync()
  });


  ipcRenderer.on('MUSIC_A', (event, arg) => {
    if (arg) {
      if (pId == 1) {
        leftMusic.style.backgroundColor = "#555555"
      } else {
        rightMusic.style.backgroundColor = "#555555"
      }
    } else {
      if (pId == 1) {
        leftMusic.style.backgroundColor = ""
      } else {
        rightMusic.style.backgroundColor = ""
      }
    }
    sync()
  });

  ipcRenderer.on('MUSIC_B', (event, arg) => {
    if (arg) {
      if (pId == 1) {
        rightMusic.style.backgroundColor = "#555555"
      } else {
        leftMusic.style.backgroundColor = "#555555"
      }
    } else {
      if (pId == 1) {
        rightMusic.style.backgroundColor = ""
      } else {
        leftMusic.style.backgroundColor = ""
      }
    }
    sync()
  });

  $('ul.tabs__caption').on('click', 'li:not(.active)', function () {
    $(this)
      .addClass('active').siblings().removeClass('active')
      .closest('div.tabs').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active');

    resizemap()
  });

  pId = parseInt(document.URL.replace(/^\D+/g, ''))
  opId = 1 + 2 - pId

  if (pId == 1)
    ipcRenderer.send('getSettings1')
  else
    ipcRenderer.send('getSettings2')

  ipcRenderer.on('setSettings', (event, arg) => {
    autoSettings = arg
    if (arg.checkIp)
      updateRemoteAddress("")

    if (arg.ws != "") {
      // Connect to Web Socket
      ws = new WebSocket(arg.ws);

      // Set event handlers.
      ws.onopen = function () {
        ws.send(JSON.stringify({ "host": pId }));
      };

      ws.onmessage = function (e) {
        let mes = JSON.parse(e.data)
        if (mes["sync"])
          return
        triggerMouseEvent(document.getElementById(mes.id), mes.event);
      };
    }
  });

  setupRTC.innerHTML = `
  <video id="leftVideo" playsinline autoplay controls style="display:none"></video>
  <b>WebRTC 1-2 status: </b><div id="div2">Not connected</div>
`
}
function sync() {
  if (typeof ws == 'undefined')
    return

  let payload = {
    "sync": pId,
    "innerText": {
      "localMuted": localMuted.innerText,
      "remoteMuted": remoteMuted.innerText
    },
    "backgroundColor": {
      "leftScreen": leftScreen.style.backgroundColor,
      "leftMute": leftMute.style.backgroundColor,
      "leftSkip": leftSkip.style.backgroundColor,
      "leftDiscord": leftDiscord.style.backgroundColor,
      "leftMusic": leftMusic.style.backgroundColor,
      "leftMic": leftMic.style.backgroundColor,
      "rightMic": rightMic.style.backgroundColor,
      "rightMusic": rightMusic.style.backgroundColor,
      "rightDiscord": rightDiscord.style.backgroundColor,
      "rightSkip": rightSkip.style.backgroundColor,
      "rightMute": rightMute.style.backgroundColor,
      "rightScreen": rightScreen.style.backgroundColor,
    }
  }

  if (payload.innerText.localMuted == "🔊") {
    payload.innerText.localMuted = "no"
  } else {
    payload.innerText.localMuted = "yes"
  }

  if (payload.innerText.remoteMuted == "🔊") {
    payload.innerText.remoteMuted = "no"
  } else {
    payload.innerText.remoteMuted = "yes"
  }

  ws.send(JSON.stringify(payload))
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
  document.getElementsByClassName("video-container__buttons remote-video__buttons")[0].style.opacity = 0.0

  $(".gender-selector")[0].parentElement.remove()

  injectControls()

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
    // dc.onmessage = mes => 
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

  function bridge(data) {
    {
      //log("> " + mes.data)
      mes = JSON.parse(data)
      if (mes["command"]) {
        switch (mes["command"]) {
          case "mute":
            document.getElementById('remote-video').muted = !document.getElementById('remote-video').muted
            if (document.getElementById('remote-video').muted) {
              remoteMuted.innerText = "🔇"
            } else {
              remoteMuted.innerText = "🔊"
            }


            bridgeSend(JSON.stringify({
              "mute_status": document.getElementById('remote-video').muted
            }));
            break;

          case "mute_on":
            document.getElementById('remote-video').muted = true
            remoteMuted.innerText = "🔇"

            bridgeSend(JSON.stringify({
              "mute_status": document.getElementById('remote-video').muted
            }));
            break;

          case "mute_off":
            document.getElementById('remote-video').muted = false
            remoteMuted.innerText = "🔊"

            bridgeSend(JSON.stringify({
              "mute_status": document.getElementById('remote-video').muted
            }));
            break;

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

      if (typeof mes["mute_status"] !== 'undefined') {
        if (mes["mute_status"]) {
          localMuted.innerText = "🔇"
        } else {
          localMuted.innerText = "🔊"
        }
        sync()
      }

      // if (mes["stage"]) {
      //   if (mes["stage"] === 1) {
      //     remotePreview.removeAttribute("src")
      //   }
      //remoteStage.innerText = mes["stage"]
      // doAlter.spellcheck = false
      // }
      if (typeof mes["info"] !== 'undefined') {
        localInfo.innerHTML = mes["info"].replace("remoteTZ", "localTZ").replace("remoteTime", "localTime")

        if (typeof mes["json"] !== 'undefined') {
          let json = JSON.parse(mes["json"])

          if (typeof marker2 !== 'undefined')
            marker2.destroy()

          map2.setCenter([json.lon, json.lat]);

          if (json.mobile) {
            marker2 = new mapgl.Marker(map2, {
              coordinates: [json.lon, json.lat],
              icon: "https://svgur.com/i/WGw.svg"
            });
          } else {
            marker2 = new mapgl.Marker(map2, {
              coordinates: [json.lon, json.lat],
            });
          }
        }
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

  ipcRenderer.on('autoset', (event, arg) => {
    console.dir(arg)
    dirrr = arg
  });


  if (pId == 1) {
    createOffer()

    ipcRenderer.on('forWin1', (event, arg) => {
      if (pc.signalingState != "have-local-offer") return;
      var obj = { type: "answer", sdp: arg.answer };
      pc.setRemoteDescription(new RTCSessionDescription(obj)).catch(log);
    });

    ipcRenderer.on('dc1', (event, arg) => {
      bridge(arg)
    });

  } else {
    ipcRenderer.on('dc2', (event, arg) => {
      bridge(arg)
    });

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


          bridgeSend(JSON.stringify({
            "stage": 1
          }));


          bridgeSend(JSON.stringify({
            "info": remoteInfo.innerHTML
          }));
        } else if (attributeValue.includes("s-found")) {
          stage = 2

          found = Date.now()


          bridgeSend(JSON.stringify({
            "stage": 2
          }));
        } else if (attributeValue.includes("s-play")) {
          stage = 3

          play = Date.now()
          console.dir("Loading took: " + parseFloat((play - found) / 1000).toFixed(2) + " sec")


          bridgeSend(JSON.stringify({
            "stage": 3
          }));
        } else if (attributeValue.includes("s-stop")) {
          stage = 0

          bridgeSend(JSON.stringify({
            "stage": 4
          }));

          if (remoteInfo.innerHTML.search("IP: ") == -1)
            remoteInfo.innerHTML = ""

          bridgeSend(JSON.stringify({
            "info": remoteInfo.innerHTML
          }));
        }
      }
    });
  });
  observer.observe($div[0], {
    attributes: true
  });
}, 300)


document.addEventListener('keydown', e => {
  switch (e.key) {
    case "PageDown":
      if (!e.repeat) {
        if (pId == 1) {
          ipcRenderer.send('PTT_B', true);
        } else {
          ipcRenderer.send('PTT_A', true);
        }
        if (e.altKey) {
          bridgeSend(JSON.stringify({
            "command": "mute_on"
          }));
          unmute_down = true
        }
      }
      e.preventDefault()
      break;

    case "PageUp":
      if (!e.repeat) {
        if (pId == 1) {
          ipcRenderer.send('PTT_A', true);
        } else {
          ipcRenderer.send('PTT_B', true);
        }
      }

      if (e.altKey) {
        document.getElementById('remote-video').muted = true
        remoteMuted.innerText = "🔇"

        bridgeSend(JSON.stringify({
          "mute_status": document.getElementById('remote-video').muted
        }));
        unmute_up = true
      }
      e.preventDefault()
      break;
  }
});

document.addEventListener('keyup', e => {
  switch (e.key) {
    case "PageDown":
      if (pId == 1) {
        ipcRenderer.send('PTT_B', false);
      } else {
        ipcRenderer.send('PTT_A', false);
      }

      if (unmute_down) {
        unmute_down = false
        bridgeSend(JSON.stringify({
          "command": "mute_off"
        }));
      }
      e.preventDefault()
      break;

    case "PageUp":
      if (pId == 1) {
        ipcRenderer.send('PTT_A', false);
      } else {
        ipcRenderer.send('PTT_B', false);
      }
      if (unmute_up) {
        unmute_up = false
        document.getElementById('remote-video').muted = false
        remoteMuted.innerText = "🔊"

        bridgeSend(JSON.stringify({
          "mute_status": document.getElementById('remote-video').muted
        }));
      }
      e.preventDefault()
      break;
  }
});


document.addEventListener('keyup', e => {
  if (e.key == "F5")
    location.reload();

  if (e.key == "F12")
    ipcRenderer.send('openDevTools' + pId, "nope");

  switch (e.key) {
    case "ArrowLeft":
      leftSkip.click()
      break;

    case "ArrowRight":
      rightSkip.click()
      break;

    case "ArrowUp":
      triggerMouseEvent(leftSkip, "contextmenu");
      triggerMouseEvent(rightSkip, "contextmenu");
      break;

    case "ArrowDown":
      leftScreen.click()
      rightScreen.click()
      break;
  }
});

function updateRemoteAddress(remoteAddress) {
  $.getJSON("http://ip-api.com/json/" + remoteAddress.replace("[", "").replace("]", ""), { lang: "ru", fields: "status,message,country,countryCode,region,regionName,city,district,zip,lat,lon,timezone,isp,org,as,mobile,proxy,hosting,query" })
    .done(function (json) {
      if (typeof marker1 !== 'undefined')
        marker1.destroy()

      map1.setCenter([json.lon, json.lat]);
      if (json.mobile) {
        remoteInfo.innerHTML = "<b>Страна: </b>" + json.country + " [" + json.countryCode + "] </br></br>" +
          "<b>TZ: </b><sup id='remoteTZ'>" + json.timezone + "</sup> (<sup id = 'remoteTime'>" + new Date().toLocaleTimeString("ru", { timeZone: json.timezone }).slice(0, -3) + "</sup>)"

        marker1 = new mapgl.Marker(map1, {
          coordinates: [json.lon, json.lat],
          icon: "https://svgur.com/i/WGw.svg"
        });
      } else {
        remoteInfo.innerHTML = "<b>Страна: </b>" + json.country + " [" + json.countryCode + "] </br>" +
          "</br>" +
          "<b>Город: </b>" + json.city + " (" + json.region + ") </br>" +
          "<b>Регион: </b>" + json.regionName + "</br>" +
          "<b>TZ: </b><sup id='remoteTZ'>" + json.timezone + "</sup> (<sup id = 'remoteTime'>" + new Date().toLocaleTimeString("ru", { timeZone: json.timezone }).slice(0, -3) + "</sup>)</br>"
        //"</br>" +
        //"<b>IP: </b>" + json.query + "</br>" +
        // "</br>" +
        //"<b>Mobile web: </b>" + json.mobile + "</br>" +
        // "<b>Провайдер: </b>" + json.isp + " </br>" +
        //"</br>" +
        // "<b>VPN: </b>" + json.proxy + " || <b>VPS: </b>" + json.hosting

        if (remoteAddress == "") {
          remoteInfo.innerHTML += "</br>" +
            "<b>IP: </b>" + json.query + "</br>"
        }

        marker1 = new mapgl.Marker(map1, {
          coordinates: [json.lon, json.lat],
        });
      }

      bridgeSend(JSON.stringify({
        "info": remoteInfo.innerHTML,
        "json": JSON.stringify(json)
      }));
    })
    .fail(function (jqxhr, textStatus, error) {
      var err = textStatus + ", " + error;
      remoteInfo.innerHTML = "<b>" + err + "</b>"
      console.error("Request Failed: " + err);
    });
}

// based on magic from https://github.com/fippo/rtcstats (MIT)

var origPeerConnection = window.RTCPeerConnection;
var id = 0;

window.RTCPeerConnection = function () {
  var pc = new origPeerConnection(arguments[0], arguments[1]);

  return pc;
};
window.RTCPeerConnection.prototype = origPeerConnection.prototype;

['addIceCandidate'].forEach(function (method) {
  var nativeMethod = window.RTCPeerConnection.prototype[method];
  if (nativeMethod) {
    window.RTCPeerConnection.prototype[method] = function () {
      var pc = this;
      var args = arguments;
      if (args[0].type === "srflx") {
        updateRemoteAddress(args[0].address)

      }
      return new Promise(function (resolve, reject) {
        nativeMethod.apply(pc, [args[0],
        function () {
          resolve();
          if (args.length >= 2) {
            args[1].apply(null, []);
          }
        },
        function (err) {
          reject(err);
          if (args.length >= 3) {
            args[2].apply(null, [err]);
          }
        }]
        );
      });
    };
  }
});

document.onreadystatechange = function () {
  if (document.readyState == "complete") {
    require('arrive')
    const $ = require('jquery')

    document.arrive(".ban-popup__unban_msg.tr", function (el) {
      document.unbindArrive(".ban-popup__unban_msg.tr");
      console.dir(el)
      let new_el = $(el).clone()
      new_el.css('height', '30px')
      new_el.css('line-height', '26px')
      new_el[0].innerHTML = "<b>videochatru-mitm:</b> your ip address might be temporary banned, use a vpn"
      new_el.insertAfter(el)
      $(createElement('button', {
        onclick: () => {
          ipcRenderer.send('clear' + pId, "nope");
          location.reload()
        },
      }, [
        createElement('b', {
          innerText: "сбросить данные сессии"
        })
      ])).insertAfter(new_el)
    });
  }
}
