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
import { log } from "./log.js"

class ApiLink {
    constructor() {
        // api definitions
        this.userid = null
        this.apikey = null
        this.factiontax = 0
        this.factionid = 'None'
        this.connected = false
        this.charges = 0
        this.wallet = 0
        this.bank = 0
        this.loan = 0
        this.gamedata = {}
        this.baseURL = 'https://tt.bouncer.nl/?'
        this.storage = null
        this.storageTab = null
        this.storages = {}
        this.itemrates = {}
        this.onlytrucking = localStorage.getItem("onlytrucking") || true
        
        // timers
//        this.updateCapacity()
    }

    showStorageTab() {
        d3.select("#storage_tab_instructions").style("display","none")
        d3.select("#storage_tab_content").style("display","block")
        d3.selectAll(".refresh-settings").style("display","table-row")
    }

    setLocation(location) {
        this.items[location.key] = {
            'location': location,
            'items': []
        }
    }

    setOnlyTrucking(event) {
        if(event.target.checked) {
            this.onlytrucking = true
            localStorage.setItem("onlytrucking", true)
            log.add('log','Enabled showing only trucking items')
        } else {
            this.onlytrucking = false
            localStorage.setItem("onlytrucking", false)
            log.add('log','Disabled showing only trucking items')
        }
        spec.updateSolution() 
    }

    addItem(item, rate, location) {
        item = item.replace('_premium','').replace('fridge_','').replace('military_','').replace('mechanicals_','').replace('petrochem_','').replace('crafted_','').replace(new RegExp('^hide.*'),'hide').replaceAll('_','-')
        let parsedItem = spec.items.get(item) || false
        if(parsedItem) {
            spec.addStorage(item, rate, location)
        }
        return [item, parsedItem.name]
    }

    getWealth() {
        // actually get data
        fetch(`${this.baseURL}path=wealth/${this.userid}&apikey=${this.apikey}`, {method: "GET"}).then(r=>r.json()).then(async data => {
            if(data.code == 200) {
                this.wealth = {'t':new Date(), 'd': data}
                localStorage.setItem("wealth", JSON.stringify(this.wealth));

                log.add('success',`Loaded wealth of $ ${data.wallet.toLocaleString()}`)
                this.parseWealth()
            } else {
                if(data.code == 412) {
                    log.add('warning',`You must be online to load wealth`)
                } else {
                    log.add('error',`Wealth error ${data.code}`)
                }
            }
            this.setCharges(data.charges)
        })
    }

    parseWealth() {
        const prevWallet = this.wallet
        this.wallet = this.wealth.d.wallet
        d3.select("#wallet").transition().tween("text", () => {
            const interpolator = d3.interpolateNumber(prevWallet, this.wallet);
            return function(t) {
                var text = Math.round(interpolator(t)).toLocaleString()
                d3.select(this).text(`$ ${text}`)
            }
        })
        .duration(2000);


        if(this.wealth.d.bank > 0) {
            const prevBank = this.bank
            this.bank = this.wealth.d.bank
            d3.select("#bank").transition().tween("text", () => {
                const interpolator = d3.interpolateNumber(prevBank, this.bank);
                return function(t) {
                    var text = Math.round(interpolator(t)).toLocaleString()
                    d3.select(this).text(`Bank: $ ${text}`)
                }
            })
            .duration(2000);
        } else {
            d3.select("#bank").text(``)
        }
        if(this.wealth.d.loan > 0) {
            const prevLoan = this.loan
            this.loan = this.wealth.d.loan
            d3.select("#loan").transition().tween("text", () => {
                const interpolator = d3.interpolateNumber(prevLoan, this.loan);
                return function(t) {
                    var text = Math.round(interpolator(t)).toLocaleString()
                    d3.select(this).text(`Loan: $ ${text}`)
                }
            })
            .duration(2000);
        } else {
            d3.select("#loan").text(``)
        }
    }

    getStorage() {
        // actually get data
        fetch(`${this.baseURL}path=storages/${this.userid}&apikey=${this.apikey}`, {method: "GET"}).then(r=>r.json()).then(async data => {
            if(data.code == 200) {
                this.storage = {'t':new Date(), 'd': data}
                localStorage.setItem("storage", JSON.stringify(this.storage));

                log.add('success',`Loaded ${data.storages.length} storages`)
                this.showStorageTab()
                this.parseStorage()
            } else {
                log.add('error',`Storage error ${data.code}`)
            }
            this.setCharges(data.charges)
        })
    }

    parseStorage() {
        for(let storage in this.storage.d.storages){
            let location = {
                "name": `${this.storage.d.storages[storage].name}`,
                "key_name": `storage-self-${this.storage.d.storages[storage].name}`,
                "category": `storage-self-${this.storage.d.storages[storage].name}`,
                "power": 1,
                "max": 1,
                "color": 14,
                "x": 0,
                "y": 0
            }
            for(let item in this.storage.d.storages[storage].inventory) {
                let [key, name] = this.addItem(item, this.storage.d.storages[storage].inventory[item].amount, location)
                this.storage.d.storages[storage].inventory[item].key = key
                if(name) {
                    this.storage.d.storages[storage].inventory[item].name = name
                    this.storage.d.storages[storage].inventory[item].visible = true
                } else {
                    this.storage.d.storages[storage].inventory[item].name = item
                    this.storage.d.storages[storage].inventory[item].visible = !this.onlytrucking
                }
            }
        }
        console.log(this.itemrates)
        d3.select("#storage").html("")
        var storages = d3.select("#storage").selectAll("table").data(this.storage.d.storages.sort((a,b) => Object.keys(b.inventory).length - Object.keys(a.inventory).length)).join("table")
            .filter(d => Object.keys(d.inventory).length > 0)
            .classed("storage-location", true)
        var storageTitleRow = storages.append("tr").classed("storage-title",true)
            storageTitleRow.append("th").text(d => `${d.name}`)
            storageTitleRow.append("th").text(d => `(${Object.keys(d.inventory).length})`)
        var storageItemRow = storages.selectAll(".storage-items").data(d => Object.entries(d.inventory).sort(([,a],[,b]) => b.amount-a.amount)).join("tr").classed("storage-items", true)
            storageItemRow.filter(d => !d[1].visible).classed("storage-other", true)
            storageItemRow.filter(d => d[1].key in this.itemrates).classed("in-storage",true)   
            storageItemRow.append("td").append("tt").text(d => `${d[1].name}`)
            storageItemRow.append("td").append("tt").text(d => `${d[1].amount.toLocaleString()}x`)
    }

    getVehicles() {
        // actually get data
        fetch(`${this.baseURL}path=trunks/${this.userid}&apikey=${this.apikey}`, {method: "GET"}).then(r=>r.json()).then(async data => {
            if(data.code == 200) {
                this.vehicles = {'t':new Date(), 'd': data}
                localStorage.setItem("vehicles", JSON.stringify(this.vehicles));
                log.add('success',`Loaded ${data.trunks.length} vehicles`)
                this.showStorageTab()
                this.parseVehicles()
            } else {
                log.add('error',`Trunk error ${data.code}`)
            }
            this.setCharges(data.charges)
        })
    }

    parseVehicles() {
        for(let storage in this.vehicles.d.trunks){
            let location = {
                "name": `${this.vehicles.d.trunks[storage].vehicle}`,
                "key_name": `storage-vehicle-${this.vehicles.d.trunks[storage].vehicle}`,
                "category": `storage-vehicle-${this.vehicles.d.trunks[storage].vehicle}`,
                "power": 1,
                "max": 1,
                "color": 15,
                "x": 0,
                "y": 0
            }
            for(let item in this.vehicles.d.trunks[storage].inventory) {
                let [key, name] = this.addItem(item, this.vehicles.d.trunks[storage].inventory[item].amount, location)
                this.vehicles.d.trunks[storage].inventory[item].key = key
                if(name) {
                    this.vehicles.d.trunks[storage].inventory[item].name = name
                    this.vehicles.d.trunks[storage].inventory[item].visible = true
                } else {
                    this.vehicles.d.trunks[storage].inventory[item].name = item
                    this.vehicles.d.trunks[storage].inventory[item].visible = !this.onlytrucking
                }
            }
        }

        d3.select("#vehicles").html("")
        var storages = d3.select("#vehicles").selectAll("table").data(this.vehicles.d.trunks.sort((a,b) => Object.keys(b.inventory).length - Object.keys(a.inventory).length)).join("table")
            .filter(d => Object.keys(d.inventory).length > 0)
            .classed("storage-location", true)
        var storageTitleRow = storages.append("tr").classed("storage-title",true)
            storageTitleRow.append("th").text(d => `${d.vehicle}`)
            storageTitleRow.append("th").text(d => `(${d.type})`)
        var storageItemRow = storages.selectAll(".storage-items").data(d => Object.entries(d.inventory).sort(([,a],[,b]) => b.amount-a.amount)).join("tr").classed("storage-items", true)
            storageItemRow.filter(d => !d[1].visible).classed("storage-other", true)
            storageItemRow.filter(d => d[1].key in this.itemrates).classed("in-storage",true)  
            storageItemRow.append("td").append("tt").text(d => `${d[1].name}`)
            storageItemRow.append("td").append("tt").text(d => `${d[1].amount.toLocaleString()}x`)
    }

    getInventory() {
        // actually get data
        fetch(`${this.baseURL}path=dataadv/${this.userid}&apikey=${this.apikey}`, {method: "GET"}).then(r=>r.json()).then(async data => {
            if(data.code == 200) {
                this.inventory = {'t':new Date(), 'd': data}
                localStorage.setItem("inventory", JSON.stringify(this.inventory));
                log.add('success',`Loaded ${Object.keys(data.data.inventory).length} items in inventory`)
                this.showStorageTab()
                this.parseInventory()
            } else {
                log.add('error',`Inventory error ${data.code}`)
            }
            this.setCharges(data.charges)
        })
    }

    parseInventory() {
        let location = {
            "name": "Inventory",
            "key_name": "storage-inventory",
            "category": "storage-inventory",
            "power": 1,
            "max": 1,
            "color": 16,
            "x": 0,
            "y": 0
        }
        for(let item in this.inventory.d.data.inventory) {
            let [key, name] = this.addItem(item, this.inventory.d.data.inventory[item].amount, location)
            this.inventory.d.data.inventory[item].key = key
            if(name) {
                this.inventory.d.data.inventory[item].name = name
                this.inventory.d.data.inventory[item].visible = true
            } else {
                this.inventory.d.data.inventory[item].name = this.inventory.d.data.inventory[item].name.replace(/(<([^>]+)>)/gi, '')
                this.inventory.d.data.inventory[item].visible = !this.onlytrucking
            }
        }

        d3.select("#inventory").html("")
        var storages = d3.select("#inventory").append("table")
            .classed("storage-location", true)
        var storageTitleRow = storages.append("tr").classed("storage-title",true)
            storageTitleRow.append("th").text(d => `Inventory`)
            storageTitleRow.append("th").text(d => `(${Object.keys(this.inventory.d.data.inventory).length})`)
        var storageItemRow = storages.selectAll(".storage-items").data(Object.entries(this.inventory.d.data.inventory).sort(([,a],[,b]) => b.amount-a.amount)).join("tr").classed("storage-items", true)
            storageItemRow.filter(d => !d[1].visible).classed("storage-other", true)
            storageItemRow.filter(d => d[1].key in this.itemrates).classed("in-storage",true)
            storageItemRow.append("td").append("tt").text(d => `${d[1].name}`)
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
        if(this.wealth) {
            d3.selectAll(".ago-wealth").text(this.getTimeSince(this.wealth.t))
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
        const prev = this.charges
        this.charges = charges
        if(charges == 1) {
            log.add('warning',`You have ${charges} charg remaining`)
        } else if(charges <= 10) {
            log.add('info',`You have ${charges} charges remaining`)
        }
        d3.selectAll(".charges").style("display","inline-block")        
        d3.selectAll(".charges").transition().tween("text", () => {
            const interpolator = d3.interpolateNumber(prev, charges);
            return function(t) {
                var text = Math.round(interpolator(t)).toLocaleString()
                d3.select(this).text(`${text} charges`)
            }
        })
        .duration(2000);
    }

    setUserid(event) {
        this.userid = event.target.value
        localStorage.setItem("userid", this.userid);
        log.add('log',`Set userid to ${this.userid}`)
        if(this.connected) {
            this.showStorageTab()
        }
    }

    setFactionTax(event) {
        this.factiontax = event.target.value
        localStorage.setItem("factiontax", this.factiontax);
        log.add('log',`Set faction tax to ${this.factiontax}%`)
        spec.updateSolution()
    }

    setAPIkey(event) {
        const key = event.clipboardData.getData('text')
        log.add('log','Set API key')
        this.validate(key)
    }

    validate(key) {
        this.apikey = key
        fetch(`${this.baseURL}path=charges.json&apikey=${this.apikey}`, { method: "GET"}).then(r=>r.json()).then(async data => {
            if(data[0] > 0) {
                
                log.add('success',`Connected! ${data[0]} charges remaining`)
                this.setCharges(data[0])
                this.connected = true
                localStorage.setItem("apikey",key)
                d3.select("#api-valid").style("display","inline-block")
                d3.select("#api-invalid").style("display","none")
                if(this.userid) {
                    this.showStorageTab();
                }
            } else {
                this.apikey = null
                this.connected = false
                log.add('warning',`Could not connect. Do you have charges?`)
                d3.select("#api-valid").style("display","none")
                d3.selectAll(".charges").style("display","none")
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
                    log.add('success',`Faction set to ${data.faction_id}`)
                } else {
                    this.factionid = 'None'
                    localStorage.setItem("factionid", this.factionid);
                    d3.select("#factionid").text(`None`)
                    log.add('warning','No faction found')
                }
            }
            this.setCharges(data.charges)

            if(getFaction && this.factionid != 'None') {
                //this.getFaction()
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

        if(localStorage.factiontax) {
            this.factiontax = localStorage.getItem("factiontax")
            d3.select("#factiontax").attr("value", this.factiontax)
        }

        if(localStorage.factionid) {
            this.factionid = localStorage.getItem("factionid")
            if(this.factionid != 'None') {
                d3.select("#factionid").text(`#${this.factionid}`)
            } else {
                d3.select("#factionid").text(`None`)
            }
        }

        if(localStorage.wealth) {
            this.wealth = JSON.parse(localStorage.getItem("wealth"))
            this.parseWealth();
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
    }

    update(totals) {
        this.itemrates = totals.items

        if(this.inventory) {
            this.parseInventory()
        }

        if(this.vehicles) {
            this.parseVehicles()
        }

        if(this.storage) {
            this.parseStorage()
        }
    }
}

export let api = new ApiLink()
window.api = api
