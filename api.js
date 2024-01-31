/*Copyright 2024 Bouncer

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.*/


class ApiLink {
    constructor() {
        // api definitions
        this.userid = null
        this.apikey = null
        this.connected = false
        this.charges = 0
        this.gamedata = {}
        this.baseURL = 'https://tt.bouncer.nl/?'
        this.storage = null
        this.items = null
        this.storageTab = null

    
        if(localStorage.userid) {
            this.userid = localStorage.getItem("userid")
            d3.select("#userid").attr("value", this.userid)
        }

        if(localStorage.apikey) {
            this.apikey = localStorage.getItem("apikey")
            d3.select("#apikey").attr("value", this.apikey)
            this.validate(this.apikey)
            this.showStorageTab();
        }

        if(localStorage.storage) {
            this.showStorageTab()
            this.storage = JSON.parse(localStorage.getItem("storage"))
            this.parseStorage()
        }
        
        // timers
//        this.updateCapacity()
    }

    showStorageTab() {
        let storageTab = d3.select("#storage_tab").html("")
        this.storageTab = storageTab.append("div")
            .attr("id","storage")
            .text("No data found in memory. Press refresh to retrieve your storage data.")
    }

    getStorage() {
        // actually get data
        fetch(`${this.baseURL}path=storages/${this.userid}&apikey=${this.apikey}`, {method: "GET"}).then(r=>r.json()).then(async data => {
            this.storage = {'t':new Date(), 'd': data}
            localStorage.setItem("storage", JSON.stringify(this.storage));

            this.charges = data.charges;
            d3.select("#charges").style("display","inline-block").text(`${this.charges.toLocaleString()} charges`)

            this.showStorageTab()
            this.parseStorage()
        })
    }

    parseStorage() {
        d3.select("#storage").html("")
        var storages = d3.select("#storage").selectAll("table").data(this.storage.d.storages).join("table").classed("storage-location", true)
        var storageTitleRow = storages.append("tr").classed("storage-title",true)
            storageTitleRow.append("th").text(d => `${d.name}`)
            storageTitleRow.append("th").text(d => `(${Object.keys(d.inventory).length})`)
        var storageItemRow = storages.selectAll(".storage-items").data(d => Object.entries(d.inventory).sort(([,a],[,b]) => b.amount-a.amount)).join("tr").classed("storage-items", true)
            storageItemRow.append("td").append("tt").text(d => `${d[0]}`)
            storageItemRow.append("td").append("tt").text(d => `${d[1].amount}x`)
    }

    updateTimers() {
        if(this.storage) {
            d3.select("#ago-storage").text(this.getTimeSince(this.storage.t))
        }
    }

    getTimeSince(date) {
        const intervals = [
            { label: 'year', seconds: 31536000 },
            { label: 'month', seconds: 2592000 },
            { label: 'day', seconds: 86400 },
            { label: 'hour', seconds: 3600 },
            { label: 'minute', seconds: 60 },
            { label: 'second', seconds: 1 }
          ];

        const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
        if(seconds < 2) { return `Loading` }
        const interval = intervals.find(i => i.seconds < seconds);
        const count = Math.floor(seconds / interval.seconds);
        return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
    }

    getCharges() {

    }

    setUserid(event) {
        this.userid = event.target.value
        localStorage.setItem("userid", this.userid);

    }

    setAPIkey(event) {
        this.validate(event.target.value)
    }

    async validate(key) {
        this.apikey = key
        fetch(`${this.baseURL}path=charges.json&apikey=${this.apikey}`, { method: "GET"}).then(r=>r.json()).then(async data => {
            this.charges = data[0]
            if(this.charges > 0) {
                this.connected = true
                localStorage.setItem("apikey",key)
                d3.select("#api-valid").style("display","inline-block")
                d3.select("#charges").style("display","inline-block").text(`${this.charges.toLocaleString()} charges`)
                d3.select("#api-invalid").style("display","none")
                d3.selectAll(".refresh-settings").style("display","table-row")
                this.update()
            } else {
                this.apikey = null
                this.connected = false
                d3.select("#api-valid").style("display","none")
                d3.select("#charges").style("display","none")
                d3.select("#api-invalid").style("display","inline-block")
                d3.selectAll(".refresh-settings").style("display","none")
            }
        })

    }
    update() {
    }
}

export let api = new ApiLink()
window.api = api
