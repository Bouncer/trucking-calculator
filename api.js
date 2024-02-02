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

import { spec } from "./factory.js"

class ApiLink {
    constructor() {
        // api definitions
        this.userid = null
        this.apikey = null
        this.factionid = null
        this.connected = false
        this.charges = 0
        this.gamedata = {}
        this.baseURL = 'https://tt.bouncer.nl/?'
        this.storage = null
        this.items = null
        this.storageTab = null
        this.storages = {}
        this.itemrates = {}
        this.storages = d3.json("data/storages.json")

        this.init()
        // timers
//        this.updateCapacity()
    }

    showStorageTab() {
        d3.select("#storage_tab_instructions").style("display","none")
        d3.select("#storage_tab_content").style("display","block")
        d3.selectAll(".refresh-settings").style("display","table-row")
    }

    getStorage() {
        // actually get data
        fetch(`${this.baseURL}path=storages/${this.userid}&apikey=${this.apikey}`, {method: "GET"}).then(r=>r.json()).then(async data => {
            this.storage = {'t':new Date(), 'd': data}
            localStorage.setItem("storage", JSON.stringify(this.storage));

            this.setCharges(data.charges)

            this.showStorageTab()
            this.parseStorage()
        })
    }

    parseStorage() {
        d3.select("#storage").html("")
        var storages = d3.select("#storage").selectAll("table").data(this.storage.d.storages.sort((a,b) => Object.keys(b.inventory).length - Object.keys(a.inventory).length)).join("table")
            .filter(d => Object.keys(d.inventory).length > 0)
            .classed("storage-location", true)
        var storageTitleRow = storages.append("tr").classed("storage-title",true)
            storageTitleRow.append("th").text(d => `${d.name}`)
            storageTitleRow.append("th").text(d => `(${Object.keys(d.inventory).length})`)
        var storageItemRow = storages.selectAll(".storage-items").data(d => Object.entries(d.inventory).sort(([,a],[,b]) => b.amount-a.amount)).join("tr").classed("storage-items", true)
            storageItemRow.filter(d => d[0].replace('_','-') in this.itemrates).classed("in-storage",true)   
            storageItemRow.append("td").append("tt").text(d => `${d[0]}`)
            storageItemRow.append("td").append("tt").text(d => `${d[1].amount.toLocaleString()}x`)
    }

    getVehicles() {
        // actually get data
        fetch(`${this.baseURL}path=trunks/${this.userid}&apikey=${this.apikey}`, {method: "GET"}).then(r=>r.json()).then(async data => {
            this.vehicles = {'t':new Date(), 'd': data}
            localStorage.setItem("vehicles", JSON.stringify(this.vehicles));
            this.setCharges(data.charges)

            this.showStorageTab()
            this.parseVehicles()
        })
    }

    parseVehicles() {
        d3.select("#vehicles").html("")
        var storages = d3.select("#vehicles").selectAll("table").data(this.vehicles.d.trunks.sort((a,b) => Object.keys(b.inventory).length - Object.keys(a.inventory).length)).join("table")
            .filter(d => Object.keys(d.inventory).length > 0)
            .classed("storage-location", true)
        var storageTitleRow = storages.append("tr").classed("storage-title",true)
            storageTitleRow.append("th").text(d => `${d.vehicle}`)
            storageTitleRow.append("th").text(d => `(${d.type})`)
        var storageItemRow = storages.selectAll(".storage-items").data(d => Object.entries(d.inventory).sort(([,a],[,b]) => b.amount-a.amount)).join("tr").classed("storage-items", true)
            storageItemRow.filter(d => d[0].replace('_','-') in this.itemrates).classed("in-storage",true)  
            storageItemRow.append("td").append("tt").text(d => `${d[0]}`)
            storageItemRow.append("td").append("tt").text(d => `${d[1].amount.toLocaleString()}x`)
    }

    getInventory() {
        // actually get data
        fetch(`${this.baseURL}path=dataadv/${this.userid}&apikey=${this.apikey}`, {method: "GET"}).then(r=>r.json()).then(async data => {
            this.inventory = {'t':new Date(), 'd': data}
            localStorage.setItem("inventory", JSON.stringify(this.inventory));
            this.setCharges(data.charges)

            this.showStorageTab()
            this.parseInventory()
        })
    }

    parseInventory() {
        d3.select("#inventory").html("")
        var storages = d3.select("#inventory").append("table")
            .classed("storage-location", true)
        var storageTitleRow = storages.append("tr").classed("storage-title",true)
            storageTitleRow.append("th").text(d => `Inventory`)
            storageTitleRow.append("th").text(d => `(${Object.keys(this.inventory.d.data.inventory).length})`)
        var storageItemRow = storages.selectAll(".storage-items").data(Object.entries(this.inventory.d.data.inventory).sort(([,a],[,b]) => b.amount-a.amount)).join("tr").classed("storage-items", true)
            storageItemRow.filter(d => d[0].replace('_','-') in this.itemrates).classed("in-storage",true)
            storageItemRow.append("td").append("tt").text(d => `${d[1].name.replace(/(<([^>]+)>)/gi, '')}`)
            storageItemRow.append("td").append("tt").text(d => `${d[1].amount.toLocaleString()}x`)
    }

    getFaction() {
        // actually get data
        if(!this.factionid) {
            this.getFactionId(true)
        } else {
            fetch(`${this.baseURL}path=chest/self_storage:${this.userid}:faq_${this.factionid}:chest&apikey=${this.apikey}`, {method: "GET"}).then(r=>r.json()).then(async data => {
                this.faction = {'t':new Date(), 'd': data}
                localStorage.setItem("faction", JSON.stringify(this.faction));
                this.setCharges(data.charges)

                this.showStorageTab()
                this.parseFaction()
            })
        }
    }

    parseFaction() {
        d3.select("#faction").html("")
        var storages = d3.select("#faction").append("table")
            .classed("storage-location", true)
        var storageTitleRow = storages.append("tr").classed("storage-title",true)
            storageTitleRow.append("th").text(d => `Faction`)
            storageTitleRow.append("th").text(d => `(${Object.keys(this.faction.d.data).length})`)
        var storageItemRow = storages.selectAll(".storage-items").data(Object.entries(this.faction.d.data).sort(([,a],[,b]) => b.amount-a.amount)).join("tr").classed("storage-items", true)
            storageItemRow.filter(d => d[0].replace('_','-') in this.itemrates).classed("in-storage",true)
            storageItemRow.append("td").append("tt").text(d => `${d[0]}`)
            storageItemRow.append("td").append("tt").text(d => `${d[1].amount.toLocaleString()}x`)
    }

    updateTimers() {
        if(this.storage) {
            d3.selectAll(".ago-storage").text(this.getTimeSince(this.storage.t))
        }
        if(this.vehicles) {
            d3.selectAll(".ago-vehicles").text(this.getTimeSince(this.vehicles.t))
        }
        if(this.inventory) {
            d3.selectAll(".ago-inventory").text(this.getTimeSince(this.inventory.t))
        }
        if(this.faction) {
            d3.selectAll(".ago-faction").text(this.getTimeSince(this.faction.t))
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

    setCharges(charges) {
        this.charges = charges;
        d3.select("#charges").style("display","inline-block").text(`${charges.toLocaleString()} charges`)
    }

    setUserid(event) {
        this.userid = event.target.value
        localStorage.setItem("userid", this.userid);
        if(this.connected) {
            this.showStorageTab()
        }
    }

    setAPIkey(event) {
        const key = event.clipboardData.getData('text')
        this.validate(key)
    }

    validate(key) {
        this.apikey = key
        fetch(`${this.baseURL}path=charges.json&apikey=${this.apikey}`, { method: "GET"}).then(r=>r.json()).then(async data => {
            this.charges = data[0]
            if(this.charges > 0) {
                this.connected = true
                localStorage.setItem("apikey",key)
                d3.select("#api-valid").style("display","inline-block")
                this.setCharges(this.charges)
                d3.select("#api-invalid").style("display","none")
                if(this.userid) {
                    this.showStorageTab();
                }
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

    getFactionId(getFaction) {
        fetch(`${this.baseURL}path=getuserfaq/${this.userid}&apikey=${this.apikey}`, {method: "GET"}).then(r=>r.json()).then(async data => {
            if(data.code == 200) {
                if(data.is_in_faction) {
                    this.factionid = data.faction_id
                    localStorage.setItem("factionid", this.factionid);
                    d3.select("#factionid").text(`#${data.faction_id}`)
                } else {
                    this.factionid = null
                    d3.select("#factionid").text(`None`)
                }
            }
            this.setCharges(data.charges)

            if(getFaction) {
                this.getFaction()
            }
        })
    }

    init() {

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

        if(localStorage.factionid) {
            this.factionid = localStorage.getItem("factionid")
            d3.select("#factionid").text(`#${this.factionid}`)
        }

        if(localStorage.inventory) {
            this.showStorageTab()
            this.inventory = JSON.parse(localStorage.getItem("inventory"))
            this.parseInventory()
        }

        if(localStorage.vehicles) {
            this.showStorageTab()
            this.vehicles = JSON.parse(localStorage.getItem("vehicles"))
            this.parseVehicles()
        }

        if(localStorage.storage) {
            this.showStorageTab()
            this.storage = JSON.parse(localStorage.getItem("storage"))
            this.parseStorage()
        }
        if(localStorage.faction) {
            this.showStorageTab()
            this.faction = JSON.parse(localStorage.getItem("faction"))
            this.parseFaction()
        }
    }

    update(totals) {
        this.itemrates = totals.itemRates

        if(this.inventory) {
            this.parseInventory()
        }

        if(this.vehicles) {
            this.parseVehicles()
        }

        if(this.storage) {
            this.parseStorage()
        }

        if(this.faction) {
            this.parseFaction()
        }
    }
}

export let api = new ApiLink()
window.api = api
