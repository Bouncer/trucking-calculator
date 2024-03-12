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
        this.vehicles = null
        this.inventory = null
        this.wealth = null
        this.players = null

        this.storageTab = null
        this.itemrates = {}
        this.onlytrucking = true
        this.usestorage = true
        this.playeronline = false
        this.playerjob = null
        this.player = null
        this.server = "beta"
        this.autorefresh = {
            'inventory': 0,
            'vehicles': 0,
            'storage': 0,
            'wealth': 0
        }
        
        // timers
//        this.updateCapacity()
    }

    roundedTime() {
        return new Date(Math.floor(new Date() / 60000) * 60000)
    }

    timedUpdateSolution() {
        // check if auto update in queue
        if(this.connected && this.player && this.player[5] == 'Trucker') {
            var now = Date.now()
            if(this.inventory && this.autorefresh.inventory > 0 && (now - new Date(this.inventory.t).getTime() - this.autorefresh.inventory) > -5000) {
                return false
            }
            if(this.vehicles && this.autorefresh.vehicles > 0 && (now - new Date(this.vehicles.t).getTime() - this.autorefresh.vehicles) > -5000) {
                return false
            }
            if(this.storage && this.autorefresh.storage > 0 && (now - new Date(this.storage.t).getTime() - this.autorefresh.storage) > -5000) {
                return false
            }
            spec.updateSolution()
        } else {
            spec.updateSolution()
        }
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

        var now = Date.now()
        
        // if api and player id are set we refresh every minute, otherwise every 10
        if(this.connected && (!this.players || (!this.player && (now - new Date(this.players.t).getTime()) > 5000) || (this.player && (now - new Date(this.players.t).getTime()) > 60000))) {
            // to prevent loops
            this.players = {t:now}
            this.getPlayers()
        }

        // auto refresh
        // if player is online and trucking
        if(this.connected && this.player && this.player[5] == 'Trucker') {
            
            if(this.inventory && !this.inventory.updating && this.autorefresh.inventory > 0 && (now - new Date(this.inventory.t).getTime()) > this.autorefresh.inventory) {
                this.inventory.updating = true
                this.getInventory()
                return true
            }
            if(this.vehicles && !this.vehicles.updating && this.autorefresh.vehicles > 0 && (now - new Date(this.vehicles.t).getTime()) > this.autorefresh.vehicles) {
                this.vehicles.updating = true
                this.getVehicles()
                return true
            }
            if(this.storage && !this.storage.updating && this.autorefresh.storage > 0 && (now - new Date(this.storage.t).getTime()) > this.autorefresh.storage) {
                this.storage.updating = true
                this.getStorage()
                return true
            }
            if(this.wealth && !this.wealth.updating && this.autorefresh.wealth > 0 && (now - new Date(this.wealth.t).getTime()) > this.autorefresh.wealth) {
                this.wealth.updating = true
                this.getWealth()
                return true
            }
        }
    }

    setAutoRefresh(storage, event) {
        this.autorefresh[storage] = event.target.value * 1000
        localStorage.setItem('autorefresh', JSON.stringify(this.autorefresh))
        log.add('info',`Set ${storage} auto refresh to ${event.target.selectedOptions[0].outerText}`)
        this.showChargeUsage()
    }

    showChargeUsage() {
        let chargeCount = 0
        if(this.autorefresh.inventory > 0) {
            chargeCount += (3600 / (this.autorefresh.inventory / 1000))
        }
        if(this.autorefresh.vehicles > 0) {
            chargeCount += (3600 / (this.autorefresh.vehicles / 1000))
        }
        if(this.autorefresh.storage > 0) {
            chargeCount += (3600 / (this.autorefresh.storage / 1000))
        }
        if(this.autorefresh.wealth > 0) {
            chargeCount += (3600 / (this.autorefresh.wealth / 1000))
        }
        d3.select('#charges-usage').text(`${(chargeCount).toLocaleString()} charge${chargeCount > 1 ? 's' : ''} ($ ${(chargeCount  * 1000).toLocaleString()}) per hour while trucking`)
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
        if(seconds <= 60) { return `Up to date` }
        const interval = intervals.find(i => i.seconds < seconds);
        const count = Math.floor(seconds / interval.seconds);
        return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
    }

    getPlayers() {
        // actually get data

        if(!this.player) {
            if(this.server == "") {
                this.server = "beta"
            } else {
                this.server = ""
            }
        }
        
        fetch(`${this.baseURL}path=widget/players.json&server=${this.server}`, {method: "GET"}).then(r=>r.json()).then(async data => {
            if(data) {
                this.players = {'t':new Date(), 'd': data}
                localStorage.setItem("players", JSON.stringify(this.players));
                //log.add('success',`Loaded online player data`)
                this.parsePlayers()
            }
        })        
    }

    parsePlayers() {
        let player = this.players.d.players.find(p => p[2] == this.userid);
        if(player === undefined) {
            if(this.player) {
                log.add('warning',`You are no longer in game`)
            }
            this.player = null
        } else {
            if(!this.player) {
                if(player[5] == "Trucker") {
                    log.add('info',`Hi ${player[0]}. I see you are now in game and trucking. Auto refresh is enabled.`)
                } else {
                   log.add('info',`Hi ${player[0]}. I see you are now in game, but not trucking.`)
                }
            } else {
                if(this.player[5] != "Trucker" && player[5] == "Trucker") {
                    log.add('info',`You are now trucking.\nAuto refresh is enabled.`)
                } else if(this.player[5] == "Trucker" && player[5] != "Trucker") {
                    log.add('info',`You are no longer trucking. Auto refresh is disabled.`)
                }
                if(this.player[5] != "Train Conductor" && player[5] == "Train Conductor") {
                    log.add('info',`Choo choo!`)
                } else if(this.player[5] != "Airline Pilot" && player[5] == "Airline Pilot") {
                    log.add('info',`Have a safe flight!`)
                } else if(this.player[5] != "Bus Driver" && player[5] == "Bus Driver") {
                    log.add('info',`Vroom Vroom!`)
                }
            }
            this.player = player
            d3.select("#playername").text(player[0])
            d3.select("#playerjob").text(player[5])
            d3.select("#playericon img").attr('src',player[3])
            let serverText = `${this.server}`// ${this.players.d.players.length} online ${this.players.d.server.uptime.replace(" ","")}`
            d3.select("#serverdxp").text(serverText)
        }
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

    setUseStorage(event) {
        if(event.target.checked) {
            this.usestorage = true
            localStorage.setItem("usestorage", "true")
            log.add('log','Enabled using items from storage')
        } else {

            spec.storageItems = {}
            this.usestorage = false
            localStorage.setItem("usestorage", "false")
            log.add('log','Disabled using items from storage')
        }
        this.update()
        spec.updateSolution() 
    }

    addItem(item, rate, location) {
        item = item.replace('_premium','').replace('fridge_','').replace('military_','').replace('mechanicals_','').replace('petrochem_','').replace('crafted_','').replace(new RegExp('^hide.*'),'hide').replaceAll('_','-')
        let parsedItem = spec.items.get(item) || false

        // ignore inaccessible factions
        let useFaction = true
        if(location.key_name.startsWith('storage|faq_') && this.factionid != 'None' && this.factionid != location.key_name.replace('storage|faq_','')) {
            useFaction = false
        }

        if(parsedItem && this.usestorage == true && useFaction) {
            spec.setStorage(item, rate, location)
        }


        
        return [item, parsedItem.name]
    }

    removeItem(item, location) {
        item = item.replace('_premium','').replace('fridge_','').replace('military_','').replace('mechanicals_','').replace('petrochem_','').replace('crafted_','').replace(new RegExp('^hide.*'),'hide').replaceAll('_','-')
        let parsedItem = spec.items.get(item) || false

        if(parsedItem) {
            spec.removeStorage(item, location)
        }
    }

    getWealth() {
        // actually get data
        fetch(`${this.baseURL}path=wealth/${this.userid}&apikey=${this.apikey}`, {method: "GET"}).then(r=>r.json()).then(async data => {
            if(data.code == 200) {
                this.wealth = {'t': this.roundedTime(), 'd': data}
                localStorage.setItem("wealth", JSON.stringify(this.wealth));

                log.add('success',`Loaded wealth of $ ${data.wallet.toLocaleString()}`)
                this.parseWealth()
                this.setCharges(data.charges)
            } else {
                if(data.code == 412) {
                    log.add('warning',`You must be online to load wealth`)
                } else {
                    log.add('error',`Wealth error ${data.code}`)
                }
            }
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
                if(this.storage) {
                    this.storage = {'t': this.roundedTime(), 'h': this.storage.d, 'd': data}
                } else {
                    this.storage = {'t': this.roundedTime(), 'd': data}
                }
                localStorage.setItem("storage", JSON.stringify(this.storage));

                log.add('success',`Loaded ${data.storages.length} storages`)
                this.showStorageTab()
                this.parseStorage(true)
            } else {
                log.add('error',`Storage error ${data.code}`)
            }
            this.setCharges(data.charges)
        })
    }

    parseStorage(update) {

        let prevItems = []
        for(let storage in this.storage.d.storages){
            let location = {
                "name": spec.getStorageInfo(this.storage.d.storages[storage].name).name,
                "key_name": `storage|${this.storage.d.storages[storage].name}`,
                "category": `storage|${this.storage.d.storages[storage].name}`,
                "power": 1,
                "max": 1,
                "color": 14,
                "x": 0,
                "y": 0
            }
            this.storage.d.storages[storage].fullname = location.name
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
                prevItems.push(`${item}-${location.key_name}`)
            }
        }

        // remove old items
        if(update && this.storage.h) {        
            for(let storage in this.storage.h.storages){
                for(let item in this.storage.h.storages[storage].inventory) {
                    if(!(prevItems.includes(`${item}-storage|${this.storage.h.storages[storage].name}`))) {
                        this.removeItem(item, `storage|${this.storage.h.storages[storage].name}`)
                    }
                }
            }
        }

        d3.select("#storage").html("")
        var storages = d3.select("#storage").selectAll("table").data(this.storage.d.storages.sort((a,b) => Object.keys(b.inventory).length - Object.keys(a.inventory).length)).join("table")
            .filter(d => Object.keys(d.inventory).length > 0)
            .classed("storage-location", true)
        var storageTitleRow = storages.append("tr").classed("storage-title",true)
            storageTitleRow.append("th").text(d => `${d.fullname}`)
            storageTitleRow.append("th").text(d => `(${Object.keys(d.inventory).length})`)
        var storageItemRow = storages.selectAll(".storage-items").data(d => Object.entries(d.inventory).sort(([,a],[,b]) => b.amount-a.amount)).join("tr").classed("storage-items", true)
            storageItemRow.filter(d => !d[1].visible).classed("storage-other", true)
            storageItemRow.filter(d => d[1].key in this.itemrates).classed("in-storage",true)   
            storageItemRow.append("td").append("tt").text(d => `${d[1].name}`)
            storageItemRow.append("td").append("tt").text(d => `${d[1].amount.toLocaleString()}x`)
        if(update) {
            this.timedUpdateSolution()
        }
    }

    getVehicles() {
        // actually get data
        fetch(`${this.baseURL}path=trunks/${this.userid}&apikey=${this.apikey}`, {method: "GET"}).then(r=>r.json()).then(async data => {
            if(data.code == 200) {
                if(this.vehicles) {
                    this.vehicles = {'t': this.roundedTime(), 'h': this.vehicles.d, 'd': data}
                } else {
                    this.vehicles = {'t': this.roundedTime(), 'd': data}
                }
                localStorage.setItem("vehicles", JSON.stringify(this.vehicles));
                log.add('success',`Loaded ${data.trunks.length} vehicles`)
                this.showStorageTab()
                this.parseVehicles(true)
            } else {
                log.add('error',`Trunk error ${data.code}`)
            }
            this.setCharges(data.charges)
        })
    }

    parseVehicles(update) {

        let prevItems = []
        for(let storage in this.vehicles.d.trunks){
            let location = {
                "name": `${this.vehicles.d.trunks[storage].vehicle}`,
                "key_name": `storage|vehicle-${this.vehicles.d.trunks[storage].vehicle}`,
                "category": `storage|vehicle-${this.vehicles.d.trunks[storage].vehicle}`,
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
                prevItems.push(`${item}-${location.key_name}`)
            }
        }
        
        // remove old items
        if(update && this.storage.h) {        
            for(let storage in this.vehicles.h.trunks){
                for(let item in this.vehicles.h.trunks[storage].inventory) {
                    if(!(prevItems.includes(`${item}-storage|vehicle-${this.vehicles.h.trunks[storage].vehicle}`))) {
                        this.removeItem(item, `storage|vehicle-${this.vehicles.h.trunks[storage].vehicle}`)
                    }
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
        if(update) {
            this.timedUpdateSolution()
        }
    }

    getInventory() {
        // actually get data
        fetch(`${this.baseURL}path=data/${this.userid}&apikey=${this.apikey}`, {method: "GET"}).then(r=>r.json()).then(async data => {
            if(data.code == 200) {
                if(this.inventory) {
                    this.inventory = {'t': this.roundedTime(), 'h': this.inventory.d, 'd': data}
                } else {
                    this.inventory = {'t': this.roundedTime(), 'd': data}
                }
                localStorage.setItem("inventory", JSON.stringify(this.inventory));
                log.add('success',`Loaded ${Object.keys(data.data.inventory).length} items in inventory`)
                this.showStorageTab()
                this.parseInventory(true)
            } else {
                log.add('error',`Inventory error ${data.code}`)
            }
            this.setCharges(data.charges)
        })
    }

    parseInventory(update) {
        let location = {
            "name": "Inventory",
            "key_name": "storage|inventory",
            "category": "storage|inventory",
            "power": 1,
            "max": 1,
            "color": 16,
            "x": 0,
            "y": 0
        }
        // remove old items
        if(update && this.inventory.h) {
            for(let item in this.inventory.h.data.inventory) {
                if(!(item in this.inventory.d.data.inventory)) {
                    this.removeItem(item, location.key_name)
                }
            }
        }
        for(let item in this.inventory.d.data.inventory) {
            let [key, name] = this.addItem(item, this.inventory.d.data.inventory[item].amount, location)
            this.inventory.d.data.inventory[item].key = key
            if(name) {
                this.inventory.d.data.inventory[item].name = name
                this.inventory.d.data.inventory[item].visible = true
            } else {
                this.inventory.d.data.inventory[item].name = item
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
        if(update) {
            this.timedUpdateSolution()
        }
    }

    setCharges(charges) {
        const prev = this.charges
        this.charges = charges
        if(charges == 1) {
            log.add('warning',`You have ${charges.toLocaleString()} charge remaining. Renew with /api private refill`)
        } else if(charges <= 10) {
            log.add('info',`You have ${charges.toLocaleString()} charges remaining. Renew with /api private refill`)
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
        this.getPlayers()
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
                
                log.add('success',`Connected! ${data[0].toLocaleString()} charges remaining`)
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

        if(localStorage.onlytrucking) {
            this.onlytrucking = (/true/).test(localStorage.getItem("onlytrucking"))
            d3.select("#onlytrucking").attr("selected", this.onlytrucking)
        }

        if(localStorage.usestorage) {
            this.usestorage = (/true/).test(localStorage.getItem("usestorage"))
            d3.select("#usestorage").attr("selected", this.usestorage)
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

        if(localStorage.autorefresh) {
            this.autorefresh = JSON.parse(localStorage.getItem("autorefresh"))
            d3.select("#autorefresh-inventory").property('value', this.autorefresh.inventory / 1000);
            d3.select("#autorefresh-vehicles").property('value', this.autorefresh.vehicles / 1000);
            d3.select("#autorefresh-storage").property('value', this.autorefresh.storage / 1000);
            d3.select("#autorefresh-wealth").property('value', this.autorefresh.wealth / 1000);
            this.showChargeUsage()
        }
    }

    update(totals) {
        if(totals) {
            this.itemrates = totals.items
        }

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
