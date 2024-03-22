/*Copyright 2019 Kirk McDonald

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.*/
import { getBelts } from "./belt.js"
import { getBuildings } from "./building.js"
import { spec } from "./factory.js"
import { loadSettings } from "./fragment.js"
import { getItems } from "./item.js"
import { getRecipes } from "./recipe.js"
import { renderSettings } from "./settings.js"

function loadData(settings) {
    d3.json("data/data.json").then(function(data) {
        let items = getItems(data)
        let recipes = getRecipes(data, items)
        let buildings = getBuildings(data)
        let belts = getBelts(data)
        spec.setData(items, recipes, buildings, belts)
        renderSettings(settings)
        api.init()
        spec.updateSolution()
        log.add('log','Data initialized')
    })
}

export function init() {
    log.add('log','Update info Feb 25th: \n- Added usage of storage items for planning \n- Added auto refresh timers\n- Added api charge estimator\n- Added check for online and trucking \n- Added setting to hide non-trucking items \n- Added setting to disable storage usage \n- Added player info in header \n- Added missing recipes \n- Added preference to use items in inventory or trucks over other storages.\n- Fixed missing item names in storages (Please report if other items are missing) \n- Removed trip info from starting recipes for now due to errors.')
    log.add('log','Update info Feb 27th: \n- Fixed algorithm miscalculation for large routes. \n- Fixed trip details for starting items')
    log.add('log','Update info Feb 28th: \n- Added vehicle and liberty recipes and items')
    log.add('log','Update info March 5th: \n- Added planner animations\n- Added trip details to items page\n- Fixed vehicle recipe issues\n- Fixed items page amounts\n- Fixed Gravel Pulverizing calculation\n- Fixed ignoring of old factions\n- Fixed item names of old factions')
    log.add('log','Update info March 7th: \n- Added auto update synchronisation\n- Increased update speed')
    let settings = loadSettings(window.location.hash)
    loadData(settings)
}
