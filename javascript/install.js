// โค้ดนี้ถูกสร้างขึ้นโดย HelloWorld
// และอนุญาติให้มีการนำไปใช้เพื่อการศึกษาและการเรียนรู้เท่านั้น
// ไม่อนุญาตให้นำโค้ดนี้ไปใช้ในเชิงพาณิชย์หรือจำหน่ายโดยเด็ดขาด
// และไม่รับประกันความเหมาะสมหรือความเสียหายที่อาจเกิดขึ้นจากการใช้งานไฟล์นี้ในกรณีใดๆ ทั้งสิ้น

if (window.location.search === '?step=1') {
  const boxCheck = document.querySelector('.hw-box-check');
  const boxCheckSupport = boxCheck.querySelectorAll('.hw-box-check-support');
  const installLink = document.getElementById('hw-button-install-id');
  if (boxCheckSupport.length === 10) {
      installLink.href = 'index.php?step=2';
      installLink.classList.remove('hw-button-install-disabled');
      installLink.removeAttribute('disabled'); // ลบ attribute disabled
  } else {
      installLink.classList.add('hw-button-install-disabled');
      installLink.setAttribute('disabled', 'disabled'); // เพิ่ม attribute disabled
      installLink.title = 'กรุณาตรวจสอบและแก้ไขระบบให้พร้อมและครบถ้วน';
      installLink.addEventListener('click', function (e) {
          e.preventDefault();
          modal_wrapper.classList.add("active");
          s_modal.classList.remove("active");
          e_modal.classList.add("active");
      });
  }
}

if (window.location.search === '?step=2') {
  const dbHost = document.getElementById('db-host');
  const dbPort = document.getElementById('db-port');
  const dbUsername = document.getElementById('db-username');
  const dbPassword = document.getElementById('db-password');
  const dbName = document.getElementById('db-name');

  const btnInstall = document.getElementById('hw-button-install-id-database');

  // สร้าง function สำหรับตรวจสอบฟิลด์ทุกตัว
  function validateFields() {
      if (!dbHost.value || !dbPort.value || !dbUsername.value || !dbName.value) {
          btnInstall.classList.add('hw-button-install-disabled');
          btnInstall.title = 'กรุณาตรวจสอบข้อมูลให้ครบถ้วน';
          btnInstall.addEventListener('click', function (e) {
            e.preventDefault();
            modal_wrapper.classList.add("active");
            s_modal.classList.remove("active");
            e_modal.classList.add("active");
            window.location.href = '#';
          });
      } else {
          btnInstall.classList.remove('hw-button-install-disabled');
          btnInstall.title = 'พร้อมติดตั้ง';
          btnInstall.addEventListener('click', function (e) {
            e.preventDefault();
            modal_wrapper.classList.remove("active");
            s_modal.classList.remove("active");
            e_modal.classList.remove("active");
            window.location.href = this.getAttribute('href');
          });
      }
  }

  // เพิ่ม event listener ให้กับฟิลด์ทุกตัว
  dbHost.addEventListener('input', validateFields);
  dbPort.addEventListener('input', validateFields);
  dbUsername.addEventListener('input', validateFields);
  dbName.addEventListener('input', validateFields);

  btnInstall.addEventListener("click", () => {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
      }
    };
    xhttp.open('POST', 'function.php?step=createdatabase', true);
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.send(`dbHost=${dbHost.value} &dbPort=${dbPort.value} &dbUsername=${dbUsername.value} &dbPassword=${dbPassword.value} &dbName=${dbName.value}`);
  });

}

if (window.location.search === '?step=3') {
  const btnWebSetup = document.getElementById('hw-button-install-id-websetup');
  const webname = document.getElementById('web-name');
  const webuseradmin = document.getElementById('web-username-admin');
  const webpassadmin = document.getElementById('web-password-admin');
  const webconfirmpassadmin = document.getElementById('web-confirm-password-admin');
  validateFields()

  // สร้าง function สำหรับตรวจสอบฟิลด์ทุกตัว
  function validateFields() {
    if (!webname.value || !webuseradmin.value || !webpassadmin.value || !webconfirmpassadmin.value || (webpassadmin.value !== webconfirmpassadmin.value)) {
        btnWebSetup.classList.add('hw-button-install-disabled');
        btnWebSetup.title = 'กรุณาตรวจสอบข้อมูลให้ครบถ้วน';
        btnWebSetup.addEventListener('click', function (e) {
          e.preventDefault();
          modal_wrapper.classList.add("active");
          s_modal.classList.remove("active");
          e_modal.classList.add("active");
          window.location.href = '#';
        });
        if (webpassadmin.value !== webconfirmpassadmin.value) {
          btnWebSetup.value = 'รหัสผ่านไม่ตรงกัน';
        }
    } else {
        btnWebSetup.classList.remove('hw-button-install-disabled');
        btnWebSetup.title = 'พร้อมติดตั้ง';
        btnWebSetup.addEventListener('click', function (e) {
          e.preventDefault();
          modal_wrapper.classList.remove("active");
          s_modal.classList.remove("active");
          e_modal.classList.remove("active");
          window.location.href = this.getAttribute('href');
        });      
    }
  }

  btnWebSetup.addEventListener("click", () => {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
      }
    };
    xhttp.open('POST', 'function.php?step=setupweb', true);
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.send(`webname=${webname.value} &webuseradmin=${webuseradmin.value} &webpassadmin=${webpassadmin.value} &webconfirmpassadmin=${webconfirmpassadmin.value}`);
  });

  webname.addEventListener('input', validateFields);
  webuseradmin.addEventListener('input', validateFields);
  webpassadmin.addEventListener('input', validateFields);
  webconfirmpassadmin.addEventListener('input', validateFields);
}

var close_btns = document.querySelectorAll(".close_btn");
var modal_wrapper = document.querySelector(".modal_wrapper");
var s_modal = document.querySelector(".s_modal");
var e_modal = document.querySelector(".e_modal");

close_btns.forEach(function (close) {
  close.addEventListener("click", function () {
    modal_wrapper.classList.remove("active");
    s_modal.classList.remove("active");
    e_modal.classList.remove("active");
  });
});



