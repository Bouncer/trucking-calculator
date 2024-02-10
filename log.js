class Logbook {
    constructor() {
        // api definitions
        this.history = []
        this.success = window.createNotification({
            closeOnClick: true,
            displayCloseButton: false,
            positionClass: 'nfc-bottom-right',
            onclick: false,
            showDuration: 5000,
            theme: 'success'
        })
        this.info = window.createNotification({
            closeOnClick: true,
            displayCloseButton: false,
            positionClass: 'nfc-bottom-right',
            onclick: false,
            showDuration: 10000,
            theme: 'info'
        })
        this.warning = window.createNotification({
            closeOnClick: true,
            displayCloseButton: false,
            positionClass: 'nfc-bottom-right',
            onclick: false,
            showDuration: 10000,
            theme: 'warning'
        })
        this.error = window.createNotification({
            closeOnClick: true,
            displayCloseButton: false,
            positionClass: 'nfc-bottom-right',
            onclick: false,
            showDuration: 10000,
            theme: 'error'
        })
    }

    add(type, message) {
        if(type != 'log') {
            this[type]({
                message: message
            });
        }
        let row = d3.select('#logbook').append("tr")
        row.append('td').text(new Date().toTimeString().split(' ')[0])
        row.append('td').classed(type,true).html(message.replaceAll('\n','<br />'))
    }
}

export let log = new Logbook()
window.log = log
