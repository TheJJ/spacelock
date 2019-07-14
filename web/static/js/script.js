function sendToken(token) {
  console.log('Sending token: ' + token);

  const serviceUUID = '12345678-1234-5678-1234-56789abcdef0';
  const characteristicUUID = '12345678-1234-5678-1234-56789abcdef5';
  const options = {
    filters: [{
      name: 'X1'
    }],
    optionalServices: [
      serviceUUID
    ]
  };

  navigator.bluetooth.requestDevice(options)
    .then(device => {
      console.log('> Name:             ' + device.name);
      console.log('> Id:               ' + device.id);
      console.log('> Connected:        ' + device.gatt.connected);
      return device.gatt.connect();
    })
    .then(server => server.getPrimaryService(serviceUUID))
    .then(service => service.getCharacteristic(characteristicUUID))
    .then(characteristic => {
      const t = Uint8Array.from(token, c => c.charCodeAt(0));
      return characteristic.writeValue(t);
    })
    .then(_ => {
      alert('Successfully sent token!');
    })
    .catch(error => {
      alert('Something went wrong:\n' + error);
      console.log('Argh! ' + error);
    });
}

function openUserModal(req_id, name, from, to, validity_time, usermod) {
  const modal = $('#change-user-modal');
  modal.find('#input-req-id').val(req_id);
  modal.find('#input-validity-time').val(validity_time);
  modal.find('#input-username').val(name);
  modal.find('#input-usermod').prop('checked', usermod === 'True');
  const fromDate = new Date(from);
  const toDate = new Date(to);

  document.getElementById('input-valid-from-date').valueAsDate = fromDate;
  document.getElementById('input-valid-to-date').valueAsDate = toDate;

  modal.find('#input-valid-from-time').val(fromDate.getHours() + ':' + fromDate.getMinutes() + ':' + fromDate.getSeconds());
  modal.find('#input-valid-to-time').val(toDate.getHours() + ':' + toDate.getMinutes() + ':' + toDate.getSeconds());

  modal.modal();
}

function openGrantAccessModal(req_id, from, to, validity_time) {
  const modal = $('#grant-access-modal');
  modal.find('#input-req-id').val(req_id);

  modal.find('#input-validity-time').val(validity_time);
  const fromDate = new Date(from);
  const toDate = new Date(to);

  document.getElementById('input-access-valid-from-date').valueAsDate = fromDate;
  document.getElementById('input-access-valid-to-date').valueAsDate = toDate;

  modal.find('#input-access-valid-from-time').val(fromDate.getHours() + ':' + fromDate.getMinutes() + ':' + fromDate.getSeconds());
  modal.find('#input-access-valid-to-time').val(toDate.getHours() + ':' + toDate.getMinutes() + ':' + toDate.getSeconds());
  modal.modal();
}
