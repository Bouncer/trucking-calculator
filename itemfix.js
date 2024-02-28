export function itemfix() {

    var buildings = {}
    var miners = {}
    var resources = {}
    var newItems = {}
    var recipes = {}

    for(let item in data) {
        let key = data[item].key.replace('_premium','').replace('fridge_','').replace('military_','').replace('mechanicals_','').replace('petrochem_','').replace('crafted_','').replace(new RegExp('^hide.*'),'hide').replaceAll('_','-')
        
        let parsedItem = spec.items.get(key) || false
        if(!parsedItem) {
            newItems[key] = {
                "name": item,
                "key_name": key,
                "tier": "9",
                "category": "commercial",
                "weight": "5",
                "stack_size": "1000"
            }
            for(let recipe in data[item].pickup) {
                let location = data[item].pickup[recipe].location.replaceAll(' ','-').toLowerCase()
                miners[location] = {
                    "name": data[item].pickup[recipe].location,
                    "key_name": location,
                    "category": location,
                    "power": 1,
                    "max": 1,
                    "color": 8,
                    "x": 0,
                    "y": 0
                }
                resources[key] = {
                    "key_name": key,
                    "category": location
                }
                let recipeKey = recipe.replaceAll(' ','-').toLowerCase()
                recipes[recipeKey] = {
                    "name": recipe,
                    "key_name": recipeKey,
                    "category": location,
                    "time": 1,
                    "ingredients": [],
                    "product": [],
                    "weight": 0,
                    "cost": data[item].pickup[recipe].in_money,
                    "pays": data[item].pickup[recipe].out_money
                }
                for(let ing in data[item].pickup[recipe].products) {
                    recipes[recipeKey].product.push([ing.replace('_premium','').replace('fridge_','').replace('military_','').replace('mechanicals_','').replace('petrochem_','').replace('crafted_','').replace(new RegExp('^hide.*'),'hide').replaceAll('_','-'), data[item].pickup[recipe].products[ing]])
                }
            }
            for(let recipe in data[item].crafting) {
                let location = data[item].crafting[recipe].location.replaceAll(' ','-').toLowerCase()
                buildings[location] = {
                    "name": data[item].crafting[recipe].location,
                    "key_name": location,
                    "category": location,
                    "power": 1,
                    "max": 1,
                    "color": 8,
                    "x": 0,
                    "y": 0
                }
                let recipeKey = recipe.replaceAll(' ','-').toLowerCase()
                recipes[recipeKey] = {
                    "name": recipe,
                    "key_name": recipeKey,
                    "category": location,
                    "time": 1,
                    "ingredients": [],
                    "product": [],
                    "weight": 0,
                    "cost": data[item].crafting[recipe].in_money,
                    "pays": data[item].crafting[recipe].out_money
                }
                for(let ing in data[item].crafting[recipe].reagents) {
                    recipes[recipeKey].ingredients.push([ing.replace('_premium','').replace('fridge_','').replace('military_','').replace('mechanicals_','').replace('petrochem_','').replace('crafted_','').replace(new RegExp('^hide.*'),'hide').replaceAll('_','-'), data[item].crafting[recipe].reagents[ing]])
                }
                for(let ing in data[item].crafting[recipe].products) {
                    recipes[recipeKey].product.push([ing.replace('_premium','').replace('fridge_','').replace('military_','').replace('mechanicals_','').replace('petrochem_','').replace('crafted_','').replace(new RegExp('^hide.*'),'hide').replaceAll('_','-'), data[item].crafting[recipe].products[ing]])
                }
            }
            for(let recipe in data[item].usage) {
                let location = data[item].usage[recipe].location.replaceAll(' ','-').toLowerCase()
                buildings[location] = {
                    "name": data[item].usage[recipe].location,
                    "key_name": location,
                    "category": location,
                    "power": 1,
                    "max": 1,
                    "color": 8,
                    "x": 0,
                    "y": 0
                }
                let recipeKey = recipe.replaceAll(' ','-').toLowerCase()
                recipes[recipeKey] = {
                    "name": recipe,
                    "key_name": recipeKey,
                    "category": location,
                    "time": 1,
                    "ingredients": [],
                    "product": [],
                    "weight": 0,
                    "cost": data[item].usage[recipe].in_money,
                    "pays": data[item].usage[recipe].out_money
                }
                for(let ing in data[item].usage[recipe].reagents) {
                    recipes[recipeKey].ingredients.push([ing.replace('_premium','').replace('fridge_','').replace('military_','').replace('mechanicals_','').replace('petrochem_','').replace('crafted_','').replace(new RegExp('^hide.*'),'hide').replaceAll('_','-'), data[item].usage[recipe].reagents[ing]])
                }
                for(let ing in data[item].usage[recipe].products) {
                    recipes[recipeKey].product.push([ing.replace('_premium','').replace('fridge_','').replace('military_','').replace('mechanicals_','').replace('petrochem_','').replace('crafted_','').replace(new RegExp('^hide.*'),'hide').replaceAll('_','-'), data[item].usage[recipe].products[ing]])
                }
            }
        }
    }

    console.log(Object.values(buildings))
    console.log(Object.values(miners))
    console.log(Object.values(resources))
    console.log(Object.values(newItems))
    console.log(Object.values(recipes))

}

let data = {
    "Acid": {
        "name": "Acid",
        "jobs": {
            "trucker": true,
            "petrochem": true
        },
        "value": 12800,
        "pickuplocation": "",
        "craftlocation": "Filtering Plant",
        "usagelocation": "LS Factory",
        "exportlocation": "LS Port Export",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Filter Toxic Waste x3": {
                "reagents": {
                    "recycled_waste": 3
                },
                "out_money": 0,
                "in_money": 45000,
                "aptitudes": {
                    "trucking.trucking": 17.64,
                    "physical.strength": 17.64,
                    "player.player": 17.64
                },
                "description": "Filter waste materials out of the waste.",
                "products": {
                    "scrap_mercury": 6,
                    "scrap_lead": 6,
                    "scrap_acid": 12
                },
                "location": "Filtering Plant"
            },
            "Filter Toxic Waste": {
                "reagents": {
                    "recycled_waste": 1
                },
                "out_money": 0,
                "in_money": 15000,
                "aptitudes": {
                    "trucking.trucking": 5.88,
                    "physical.strength": 5.88,
                    "player.player": 5.88
                },
                "description": "Filter waste materials out of the waste.",
                "products": {
                    "scrap_mercury": 2,
                    "scrap_lead": 2,
                    "scrap_acid": 4
                },
                "location": "Filtering Plant"
            },
            "Refine Chemicals x10": {
                "reagents": {
                    "military_chemicals": 10
                },
                "out_money": 0,
                "in_money": 25000,
                "aptitudes": {
                    "trucking.trucking": 10.0,
                    "physical.strength": 10.0,
                    "player.player": 10.0
                },
                "description": "Refine Chemicals x10",
                "products": {
                    "scrap_acid": 40
                },
                "location": "Chemical Laboratories"
            },
            "Refine Chemicals": {
                "reagents": {
                    "military_chemicals": 1
                },
                "out_money": 0,
                "in_money": 2500,
                "aptitudes": {
                    "trucking.trucking": 1.0,
                    "physical.strength": 1.0,
                    "player.player": 1.0
                },
                "description": "Refine Chemicals",
                "products": {
                    "scrap_acid": 4
                },
                "location": "Chemical Laboratories"
            }
        },
        "usage": {
            "Create Batteries": {
                "reagents": {
                    "refined_solder": 4,
                    "scrap_acid": 8,
                    "refined_zinc": 2
                },
                "out_money": 0,
                "in_money": 5000,
                "aptitudes": {
                    "trucking.trucking": 2.98,
                    "physical.strength": 2.98,
                    "player.player": 2.98
                },
                "description": "Combine magic with metals to store power inside.",
                "products": {
                    "crafted_batteries": 2
                },
                "location": "LS Factory"
            },
            "Create Batteries x5": {
                "reagents": {
                    "refined_solder": 20,
                    "scrap_acid": 40,
                    "refined_zinc": 10
                },
                "out_money": 0,
                "in_money": 25000,
                "aptitudes": {
                    "trucking.trucking": 14.9,
                    "physical.strength": 14.9,
                    "player.player": 14.9
                },
                "description": "Combine magic with metals to store power inside.",
                "products": {
                    "crafted_batteries": 10
                },
                "location": "LS Factory"
            },
            "Treat Unfiltered Water x2": {
                "reagents": {
                    "scrap_acid": 2,
                    "liquid_water_raw": 2
                },
                "out_money": 0,
                "in_money": 10000,
                "aptitudes": {
                    "trucking.trucking": 13.34,
                    "physical.strength": 13.34,
                    "player.player": 13.34
                },
                "description": "Filter out the germs of that nasty water",
                "products": {
                    "liquid_water": 2
                },
                "location": "Water Treatment Plant"
            },
            "Treat Unfiltered Water": {
                "reagents": {
                    "scrap_acid": 1,
                    "liquid_water_raw": 1
                },
                "out_money": 0,
                "in_money": 5000,
                "aptitudes": {
                    "trucking.trucking": 6.67,
                    "physical.strength": 6.67,
                    "player.player": 6.67
                },
                "description": "Filter out the germs of that nasty water",
                "products": {
                    "liquid_water": 1
                },
                "location": "Water Treatment Plant"
            }
        },
        "export": {
            "Export Acid x1": {
                "reagents": {
                    "scrap_acid": 1
                },
                "out_money": 12800,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 0.17,
                    "physical.strength": 0.17,
                    "player.player": 0.17
                },
                "description": "Export acid",
                "products": [],
                "location": "LS Port Export"
            },
            "Export Acid x10": {
                "reagents": {
                    "scrap_acid": 10
                },
                "out_money": 128000,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 1.7,
                    "physical.strength": 1.7,
                    "player.player": 1.7
                },
                "description": "Export acid in bulks of 10",
                "products": [],
                "location": "LS Port Export"
            }
        },
        "key": "scrap_acid"
    },
    "Airline Meal": {
        "name": "Airline Meal",
        "jobs": {
            "fridge": true,
            "liberty": true
        },
        "value": 6500,
        "pickuplocation": "",
        "craftlocation": "Fridgit Co.",
        "usagelocation": "",
        "exportlocation": "LSIA Shipments",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Create Airline Meal x10": {
                "reagents": {
                    "fridge_veggies": 10,
                    "fridge_meat": 10,
                    "fridge_dairy": 10
                },
                "out_money": 0,
                "in_money": 25000,
                "aptitudes": {
                    "trucking.trucking": 52.4,
                    "physical.strength": 52.4,
                    "player.player": 52.4
                },
                "description": "Create Airline Meal x10",
                "products": {
                    "fridge_airline_meal": 40
                },
                "location": "Fridgit Co."
            },
            "Create Airline Meal": {
                "reagents": {
                    "fridge_veggies": 1,
                    "fridge_meat": 1,
                    "fridge_dairy": 1
                },
                "out_money": 0,
                "in_money": 2500,
                "aptitudes": {
                    "trucking.trucking": 5.24,
                    "physical.strength": 5.24,
                    "player.player": 5.24
                },
                "description": "Create Airline Meal",
                "products": {
                    "fridge_airline_meal": 4
                },
                "location": "Fridgit Co."
            },
            "Tokens to Airline Meal": {
                "reagents": {
                    "liberty_token": 1
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": [],
                "description": "Liberty Token -> Airline Meal",
                "products": {
                    "fridge_airline_meal": 1
                },
                "location": "The Undercover Storage Co."
            }
        },
        "usage": {},
        "export": {
            "Deliver Airline Meal x30": {
                "reagents": {
                    "fridge_airline_meal": 30
                },
                "out_money": 195000,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 15.9,
                    "physical.strength": 15.9,
                    "player.player": 15.9
                },
                "description": "Deliver Airline Meal",
                "products": [],
                "location": "LSIA Shipments"
            },
            "Deliver Airline Meal x10": {
                "reagents": {
                    "fridge_airline_meal": 10
                },
                "out_money": 65000,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 5.3,
                    "physical.strength": 5.3,
                    "player.player": 5.3
                },
                "description": "Deliver Airline Meal",
                "products": [],
                "location": "LSIA Shipments"
            },
            "Deliver Airline Meal": {
                "reagents": {
                    "fridge_airline_meal": 1
                },
                "out_money": 6500,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 0.53,
                    "physical.strength": 0.53,
                    "player.player": 0.53
                },
                "description": "Deliver Airline Meal",
                "products": [],
                "location": "LSIA Shipments"
            }
        },
        "key": "fridge_airline_meal"
    },
    "Annis Zr-350": {
        "name": "Annis Zr-350",
        "jobs": {
            "premium.trucking": true
        },
        "value": 0,
        "pickuplocation": "",
        "craftlocation": "Vehicle Factory",
        "usagelocation": "",
        "exportlocation": "",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Annis ZR-350": {
                "reagents": {
                    "mechanicals_chassis": 1,
                    "mechanicals_wheels": 4,
                    "crafted_fiberglass": 15,
                    "refined_amalgam": 50,
                    "crafted_circuit": 5,
                    "mechanicals_battery": 1,
                    "refined_glass": 25,
                    "mechanicals_vehicle_framework": 1
                },
                "description": "Annis ZR-350",
                "out_money": 0,
                "in_money": 1620000,
                "aptitudes": {
                    "trucking.trucking": 13.0,
                    "physical.strength": 13.0,
                    "player.player": 12.0
                },
                "products": {
                    "vehicle_shipment|zr350|Annis ZR-350|car": 1
                },
                "location": "Vehicle Factory"
            }
        },
        "usage": {},
        "export": {},
        "key": "vehicle_shipment|zr350|Annis ZR-350|car"
    },
    "Asphalt": {
        "name": "Asphalt",
        "jobs": {
            "trucker": true,
            "petrochem": true
        },
        "value": 5000,
        "pickuplocation": "",
        "craftlocation": "Refinery",
        "usagelocation": "",
        "exportlocation": "Alta Construction Site",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Create Asphalt": {
                "permissionsText": "Asphalt Concrete Refining Secret",
                "in_money": 10250,
                "aptitudes": {
                    "trucking.trucking": 8.81,
                    "physical.strength": 8.81,
                    "player.player": 8.81
                },
                "products": {
                    "petrochem_asphalt": 20
                },
                "secret": true,
                "description": "Create Asphalt",
                "reagents": {
                    "petrochem_oil": 1,
                    "scrap_gravel": 20
                },
                "permissions": [
                    "sd.trucking.asphalt"
                ],
                "out_money": 0,
                "location": "Refinery"
            }
        },
        "usage": {},
        "export": {
            "Deliver Asphalt Concrete": {
                "permissionsText": "Asphalt Concrete Refining Secret",
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 5.81,
                    "physical.strength": 5.81,
                    "player.player": 5.81
                },
                "products": [],
                "secret": true,
                "description": "Deliver Asphalt Concrete",
                "reagents": {
                    "petrochem_asphalt": 5
                },
                "permissions": [
                    "sd.trucking.asphalt"
                ],
                "out_money": 25000,
                "location": "Alta Construction Site"
            },
            "Deliver Asphalt Concrete x5": {
                "permissionsText": "Asphalt Concrete Refining Secret",
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 29.04999999999999,
                    "physical.strength": 29.04999999999999,
                    "player.player": 29.04999999999999
                },
                "products": [],
                "secret": true,
                "description": "Deliver Asphalt Concrete x5",
                "reagents": {
                    "petrochem_asphalt": 25
                },
                "permissions": [
                    "sd.trucking.asphalt"
                ],
                "out_money": 125000,
                "location": "Alta Construction Site"
            }
        },
        "key": "petrochem_asphalt"
    },
    "Batteries": {
        "name": "Batteries",
        "jobs": {
            "trucker": true,
            "premium.trucking": true
        },
        "value": 150000,
        "pickuplocation": "",
        "craftlocation": "LS Factory",
        "usagelocation": "LS Factory",
        "exportlocation": "LS Port Export",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Create Batteries": {
                "reagents": {
                    "refined_solder": 4,
                    "scrap_acid": 8,
                    "refined_zinc": 2
                },
                "out_money": 0,
                "in_money": 5000,
                "aptitudes": {
                    "trucking.trucking": 2.98,
                    "physical.strength": 2.98,
                    "player.player": 2.98
                },
                "description": "Combine magic with metals to store power inside.",
                "products": {
                    "crafted_batteries": 2
                },
                "location": "LS Factory"
            },
            "Create Batteries x5": {
                "reagents": {
                    "refined_solder": 20,
                    "scrap_acid": 40,
                    "refined_zinc": 10
                },
                "out_money": 0,
                "in_money": 25000,
                "aptitudes": {
                    "trucking.trucking": 14.9,
                    "physical.strength": 14.9,
                    "player.player": 14.9
                },
                "description": "Combine magic with metals to store power inside.",
                "products": {
                    "crafted_batteries": 10
                },
                "location": "LS Factory"
            }
        },
        "usage": {
            "Create Computer": {
                "reagents": {
                    "crafted_circuit": 1,
                    "crafted_batteries": 1,
                    "scrap_gold": 2
                },
                "out_money": 0,
                "in_money": 5000,
                "aptitudes": {
                    "trucking.trucking": 3.81,
                    "physical.strength": 3.81,
                    "player.player": 3.81
                },
                "description": "Make Computers",
                "products": {
                    "crafted_computer": 2
                },
                "location": "LS Factory"
            },
            "Create Computer x10": {
                "reagents": {
                    "crafted_circuit": 10,
                    "crafted_batteries": 10,
                    "scrap_gold": 20
                },
                "out_money": 0,
                "in_money": 50000,
                "aptitudes": {
                    "trucking.trucking": 38.1,
                    "physical.strength": 38.1,
                    "player.player": 38.1
                },
                "description": "Make 10 Computers",
                "products": {
                    "crafted_computer": 20
                },
                "location": "LS Factory"
            },
            "Car Battery": {
                "reagents": {
                    "crafted_batteries": 2
                },
                "out_money": 0,
                "in_money": 35000,
                "aptitudes": {
                    "trucking.trucking": 13.0,
                    "physical.strength": 13.0,
                    "player.player": 12.0
                },
                "description": "Car Battery",
                "products": {
                    "mechanicals_battery": 1
                },
                "location": "Vehicle Parts"
            }
        },
        "export": {
            "Export Batteries x10": {
                "reagents": {
                    "crafted_batteries": 10
                },
                "out_money": 1500000,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 8.0,
                    "physical.strength": 8.0,
                    "player.player": 8.0
                },
                "description": "Export batteries",
                "products": [],
                "location": "LS Port Export"
            },
            "Export Batteries x1": {
                "reagents": {
                    "crafted_batteries": 1
                },
                "out_money": 150000,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 0.8,
                    "physical.strength": 0.8,
                    "player.player": 0.8
                },
                "description": "Export batteries",
                "products": [],
                "location": "LS Port Export"
            }
        },
        "key": "crafted_batteries"
    },
    "Boat Fuel": {
        "name": "Boat Fuel",
        "jobs": {
            "petrochem": true
        },
        "value": 0,
        "pickuplocation": "",
        "craftlocation": "Oil Depository",
        "usagelocation": "",
        "exportlocation": "",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Fill Boat Cans": {
                "reagents": {
                    "petrochem_diesel": 1
                },
                "out_money": 8000,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 1.9,
                    "physical.strength": 1.9,
                    "player.player": 1.9
                },
                "description": "Fill Boat Cans",
                "products": {
                    "jerry_can|BOAT|Boat": 10
                },
                "location": "Oil Depository"
            }
        },
        "usage": {},
        "export": {},
        "key": "jerry_can|BOAT|Boat"
    },
    "Bronze Alloy": {
        "name": "Bronze Alloy",
        "jobs": {
            "trucker": true
        },
        "value": 32000,
        "pickuplocation": "",
        "craftlocation": "LS Foundry",
        "usagelocation": "LS Foundry",
        "exportlocation": "LS Port Export",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Refine Bronze Alloy x1": {
                "reagents": {
                    "scrap_aluminum": 1,
                    "scrap_tin": 1,
                    "scrap_copper": 2
                },
                "out_money": 0,
                "in_money": 1000,
                "aptitudes": {
                    "trucking.trucking": 0.84,
                    "physical.strength": 0.84,
                    "player.player": 0.84
                },
                "description": "Mix multiple metals into bronze alloy",
                "products": {
                    "refined_bronze": 2
                },
                "location": "LS Foundry"
            },
            "Refine Bronze Alloy x10": {
                "reagents": {
                    "scrap_aluminum": 10,
                    "scrap_tin": 10,
                    "scrap_copper": 20
                },
                "out_money": 0,
                "in_money": 10000,
                "aptitudes": {
                    "trucking.trucking": 8.4,
                    "physical.strength": 8.4,
                    "player.player": 8.4
                },
                "description": "Mix multiple metals into bronze alloy",
                "products": {
                    "refined_bronze": 20
                },
                "location": "LS Foundry"
            }
        },
        "usage": {
            "Substitute Gold": {
                "permissionsText": "Substitute Gold Secret",
                "in_money": 1000,
                "aptitudes": {
                    "trucking.trucking": 10.0,
                    "physical.strength": 10.0,
                    "player.player": 10.0
                },
                "products": {
                    "scrap_gold": 40
                },
                "secret": true,
                "description": "Substitute Gold",
                "reagents": {
                    "petrochem_petrol": 2,
                    "petrochem_sulfur": 10,
                    "refined_bronze": 25
                },
                "permissions": [
                    "sd.trucking.foundry.gold"
                ],
                "out_money": 0,
                "location": "LS Foundry"
            },
            "Create Rebar": {
                "reagents": {
                    "refined_bronze": 2,
                    "refined_amalgam": 6
                },
                "out_money": 0,
                "in_money": 5000,
                "aptitudes": {
                    "trucking.trucking": 4.79,
                    "physical.strength": 4.79,
                    "player.player": 4.79
                },
                "description": "Create a shipment of rebar",
                "products": {
                    "crafted_rebar": 2
                },
                "location": "LS Factory"
            },
            "Create Rebar x2": {
                "reagents": {
                    "refined_bronze": 4,
                    "refined_amalgam": 12
                },
                "out_money": 0,
                "in_money": 10000,
                "aptitudes": {
                    "trucking.trucking": 9.58,
                    "physical.strength": 9.58,
                    "player.player": 9.58
                },
                "description": "Create a shipment of rebar",
                "products": {
                    "crafted_rebar": 4
                },
                "location": "LS Factory"
            }
        },
        "export": {
            "Export Refined Bronze Alloy x1": {
                "reagents": {
                    "refined_bronze": 1
                },
                "out_money": 32000,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 0.33,
                    "physical.strength": 0.33,
                    "player.player": 0.33
                },
                "description": "Export bronze",
                "products": [],
                "location": "LS Port Export"
            },
            "Export Refined Bronze Alloy x10": {
                "reagents": {
                    "refined_bronze": 10
                },
                "out_money": 320000,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 3.3,
                    "physical.strength": 3.3,
                    "player.player": 3.3
                },
                "description": "Export bronze in bulks of 10",
                "products": [],
                "location": "LS Port Export"
            }
        },
        "key": "refined_bronze"
    },
    "Car Battery": {
        "name": "Car Battery",
        "jobs": {
            "premium.trucking": true
        },
        "value": 0,
        "pickuplocation": "",
        "craftlocation": "Vehicle Parts",
        "usagelocation": "Vehicle Factory",
        "exportlocation": "",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Car Battery": {
                "reagents": {
                    "crafted_batteries": 2
                },
                "out_money": 0,
                "in_money": 35000,
                "aptitudes": {
                    "trucking.trucking": 13.0,
                    "physical.strength": 13.0,
                    "player.player": 12.0
                },
                "description": "Car Battery",
                "products": {
                    "mechanicals_battery": 1
                },
                "location": "Vehicle Parts"
            }
        },
        "usage": {
            "HVY Nightshark": {
                "reagents": {
                    "liquid_water": 1,
                    "mechanicals_wheels": 4,
                    "crafted_fiberglass": 25,
                    "military_titanium": 60,
                    "mechanicals_vehicle_framework": 2,
                    "mechanicals_battery": 2,
                    "mechanicals_chassis": 2,
                    "crafted_circuit": 12,
                    "refined_glass": 15,
                    "refined_amalgam": 40,
                    "liberty_military_goods": 4
                },
                "description": "HVY Nightshark",
                "out_money": 0,
                "in_money": 13780000,
                "aptitudes": {
                    "trucking.trucking": 13.0,
                    "physical.strength": 13.0,
                    "player.player": 12.0
                },
                "products": {
                    "vehicle_shipment|nightshark|HVY Nightshark|car": 1
                },
                "location": "Vehicle Factory"
            },
            "Karin Futo": {
                "reagents": {
                    "mechanicals_chassis": 1,
                    "mechanicals_wheels": 4,
                    "crafted_fiberglass": 15,
                    "refined_amalgam": 50,
                    "crafted_circuit": 5,
                    "mechanicals_battery": 1,
                    "refined_glass": 25,
                    "mechanicals_vehicle_framework": 1
                },
                "description": "Karin Futo",
                "out_money": 0,
                "in_money": 220000,
                "aptitudes": {
                    "trucking.trucking": 13.0,
                    "physical.strength": 13.0,
                    "player.player": 12.0
                },
                "products": {
                    "vehicle_shipment|futo|Karin Futo|car": 1
                },
                "location": "Vehicle Factory"
            },
            "Coil Savanna": {
                "reagents": {
                    "mechanicals_battery": 1,
                    "crafted_fiberglass": 35,
                    "refined_amalgam": 50,
                    "crafted_circuit": 5,
                    "mechanicals_chassis": 1,
                    "refined_glass": 25,
                    "mechanicals_wheels": 4,
                    "mechanicals_battery_evb": 3,
                    "mechanicals_vehicle_framework": 1
                },
                "description": "Coil Savanna",
                "out_money": 0,
                "in_money": 8380000,
                "aptitudes": {
                    "trucking.trucking": 13.0,
                    "physical.strength": 13.0,
                    "player.player": 12.0
                },
                "products": {
                    "vehicle_shipment|savanna|Coil Savanna|car": 1
                },
                "location": "Vehicle Factory"
            },
            "Annis ZR-350": {
                "reagents": {
                    "mechanicals_chassis": 1,
                    "mechanicals_wheels": 4,
                    "crafted_fiberglass": 15,
                    "refined_amalgam": 50,
                    "crafted_circuit": 5,
                    "mechanicals_battery": 1,
                    "refined_glass": 25,
                    "mechanicals_vehicle_framework": 1
                },
                "description": "Annis ZR-350",
                "out_money": 0,
                "in_money": 1620000,
                "aptitudes": {
                    "trucking.trucking": 13.0,
                    "physical.strength": 13.0,
                    "player.player": 12.0
                },
                "products": {
                    "vehicle_shipment|zr350|Annis ZR-350|car": 1
                },
                "location": "Vehicle Factory"
            },
            "Hijak Vertice": {
                "reagents": {
                    "mechanicals_chassis": 1,
                    "mechanicals_wheels": 4,
                    "crafted_fiberglass": 15,
                    "refined_amalgam": 50,
                    "crafted_circuit": 5,
                    "mechanicals_battery": 1,
                    "refined_glass": 25,
                    "mechanicals_vehicle_framework": 1
                },
                "description": "Hijak Vertice",
                "out_money": 0,
                "in_money": 320000,
                "aptitudes": {
                    "trucking.trucking": 13.0,
                    "physical.strength": 13.0,
                    "player.player": 12.0
                },
                "products": {
                    "vehicle_shipment|vertice|Hijak Vertice|car": 1
                },
                "location": "Vehicle Factory"
            },
            "Coil Rocket Voltic": {
                "reagents": {
                    "mechanicals_wheels": 4,
                    "crafted_fiberglass": 15,
                    "petrochem_kerosene": 100,
                    "mechanicals_chassis": 1,
                    "refined_amalgam": 50,
                    "refined_glass": 25,
                    "mechanicals_battery": 1,
                    "crafted_circuit": 5,
                    "mechanicals_vehicle_framework": 1
                },
                "description": "Coil Rocket Voltic",
                "out_money": 0,
                "in_money": 90110000,
                "aptitudes": {
                    "trucking.trucking": 13.0,
                    "physical.strength": 13.0,
                    "player.player": 12.0
                },
                "products": {
                    "upgrade_kit_voltic2": 1
                },
                "location": "Vehicle Factory"
            },
            "Landstalker XL": {
                "permissionsText": "Landstalker XL Blueprints Secret",
                "in_money": 32000000,
                "aptitudes": {
                    "trucking.trucking": 130.0,
                    "physical.strength": 130.0,
                    "player.player": 120.0
                },
                "products": {
                    "vehicle_shipment|landstalker2|Landstalker XL|car": 1
                },
                "secret": true,
                "description": "Landstalker XL",
                "reagents": {
                    "mechanicals_chassis": 1,
                    "mechanicals_wheels": 4,
                    "crafted_fiberglass": 30,
                    "refined_amalgam": 100,
                    "crafted_circuit": 10,
                    "mechanicals_battery": 2,
                    "refined_glass": 50,
                    "mechanicals_vehicle_framework": 1
                },
                "permissions": [
                    "sd.trucking.shipment.landstalker2"
                ],
                "out_money": 0,
                "location": "Vehicle Factory"
            },
            "Traction Battery": {
                "reagents": {
                    "mechanicals_battery": 6
                },
                "out_money": 0,
                "in_money": 120000,
                "aptitudes": {
                    "trucking.trucking": 13.0,
                    "physical.strength": 13.0,
                    "player.player": 12.0
                },
                "description": "Traction Battery",
                "products": {
                    "mechanicals_battery_evb": 1
                },
                "location": "Vehicle Parts"
            }
        },
        "export": {},
        "key": "mechanicals_battery"
    },
    "Cardboard": {
        "name": "Cardboard",
        "jobs": {
            "trucker": true
        },
        "value": 60000,
        "pickuplocation": "",
        "craftlocation": "LS Factory",
        "usagelocation": "",
        "exportlocation": "McKenzie Export",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Create Cardboard": {
                "permissionsText": "Cardboard Manufacturing Secret",
                "in_money": 5000,
                "aptitudes": {
                    "trucking.trucking": 3.81,
                    "physical.strength": 3.81,
                    "player.player": 3.81
                },
                "products": {
                    "crafted_cardboard": 5
                },
                "secret": true,
                "description": "Create Cardboard",
                "reagents": {
                    "tcargodust": 50,
                    "liquid_water": 1
                },
                "permissions": [
                    "sd.trucking.cardboard"
                ],
                "out_money": 0,
                "location": "LS Factory"
            }
        },
        "usage": {},
        "export": {
            "Export Cardboard": {
                "permissionsText": "Cardboard Manufacturing Secret",
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 2.81,
                    "physical.strength": 2.81,
                    "player.player": 2.81
                },
                "products": [],
                "secret": true,
                "description": "Export Cardboard",
                "reagents": {
                    "crafted_cardboard": 1
                },
                "permissions": [
                    "sd.trucking.cardboard"
                ],
                "out_money": 60000,
                "location": "McKenzie Export"
            },
            "Export Cardboard x5": {
                "permissionsText": "Cardboard Manufacturing Secret",
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 14.05,
                    "physical.strength": 14.05,
                    "player.player": 14.05
                },
                "products": [],
                "secret": true,
                "description": "Export Cardboard x5",
                "reagents": {
                    "crafted_cardboard": 5
                },
                "permissions": [
                    "sd.trucking.cardboard"
                ],
                "out_money": 300000,
                "location": "McKenzie Export"
            }
        },
        "key": "crafted_cardboard"
    },
    "Cement Mix": {
        "name": "Cement Mix",
        "jobs": {
            "trucker": true
        },
        "value": 0,
        "pickuplocation": "",
        "craftlocation": "Quarry",
        "usagelocation": "Filtering Plant",
        "exportlocation": "",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Create Cement": {
                "reagents": {
                    "tcargodust": 2,
                    "refined_sand": 5
                },
                "out_money": 0,
                "in_money": 1500,
                "aptitudes": {
                    "trucking.trucking": 0.71,
                    "physical.strength": 0.71,
                    "player.player": 0.71
                },
                "description": "Mix together a cement mix",
                "products": {
                    "crafted_cement": 1
                },
                "location": "Quarry"
            },
            "Create Cement x10": {
                "reagents": {
                    "tcargodust": 20,
                    "refined_sand": 50
                },
                "out_money": 0,
                "in_money": 15000,
                "aptitudes": {
                    "trucking.trucking": 7.1,
                    "physical.strength": 7.1,
                    "player.player": 7.1
                },
                "description": "Mix together a cement mix",
                "products": {
                    "crafted_cement": 10
                },
                "location": "Quarry"
            }
        },
        "usage": {
            "Mix Concrete x2": {
                "reagents": {
                    "liquid_water": 2,
                    "crafted_cement": 10
                },
                "out_money": 0,
                "in_money": 30000,
                "aptitudes": {
                    "trucking.trucking": 21.7,
                    "physical.strength": 21.7,
                    "player.player": 21.7
                },
                "description": "Mix a batch of concrete",
                "products": {
                    "crafted_concrete": 2
                },
                "location": "Filtering Plant"
            },
            "Mix Concrete": {
                "reagents": {
                    "liquid_water": 1,
                    "crafted_cement": 5
                },
                "out_money": 0,
                "in_money": 15000,
                "aptitudes": {
                    "trucking.trucking": 10.85,
                    "physical.strength": 10.85,
                    "player.player": 10.85
                },
                "description": "Mix a batch of concrete",
                "products": {
                    "crafted_concrete": 1
                },
                "location": "Filtering Plant"
            }
        },
        "export": {},
        "key": "crafted_cement"
    },
    "Ceramic Tiles": {
        "name": "Ceramic Tiles",
        "jobs": {
            "trucker": true
        },
        "value": 40000,
        "pickuplocation": "",
        "craftlocation": "LS Foundry",
        "usagelocation": "",
        "exportlocation": "House Construction Site",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Ceramic Tiles": {
                "reagents": {
                    "refined_flint": 10,
                    "refined_sand": 2
                },
                "out_money": 0,
                "in_money": 1000,
                "aptitudes": {
                    "trucking.trucking": 2.88,
                    "physical.strength": 2.88,
                    "player.player": 2.88
                },
                "description": "Make Ceramic Tiles",
                "products": {
                    "crafted_ceramictiles": 2
                },
                "location": "LS Foundry"
            },
            "Ceramic Tiles x10": {
                "reagents": {
                    "refined_flint": 100,
                    "refined_sand": 20
                },
                "out_money": 0,
                "in_money": 10000,
                "aptitudes": {
                    "trucking.trucking": 28.79999999999999,
                    "physical.strength": 28.79999999999999,
                    "player.player": 28.79999999999999
                },
                "description": "Make 10 Ceramic Tiles",
                "products": {
                    "crafted_ceramictiles": 20
                },
                "location": "LS Foundry"
            }
        },
        "usage": {},
        "export": {
            "House Construction": {
                "reagents": {
                    "refined_planks": 2,
                    "crafted_concrete": 1,
                    "crafted_ceramictiles": 4,
                    "crafted_copperwire": 1,
                    "crafted_computer": 1,
                    "crafted_rebar": 1
                },
                "description": "Construct a House",
                "out_money": 2350000,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 87.49,
                    "physical.strength": 87.49,
                    "player.player": 87.49
                },
                "products": [],
                "location": "House Construction Site"
            },
            "Ceramic Tiles": {
                "reagents": {
                    "crafted_ceramictiles": 1
                },
                "out_money": 40000,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 0.29,
                    "physical.strength": 0.29,
                    "player.player": 0.29
                },
                "description": "Sell Ceramic Tiles",
                "products": [],
                "location": "LS Port Export"
            },
            "Ceramic Tiles x10": {
                "reagents": {
                    "crafted_ceramictiles": 10
                },
                "out_money": 400000,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 2.9,
                    "physical.strength": 2.9,
                    "player.player": 2.9
                },
                "description": "Sell Ceramic Tiles",
                "products": [],
                "location": "LS Port Export"
            }
        },
        "key": "crafted_ceramictiles"
    },
    "Chassis": {
        "name": "Chassis",
        "jobs": {
            "premium.trucking": true
        },
        "value": 0,
        "pickuplocation": "",
        "craftlocation": "Vehicle Parts",
        "usagelocation": "Vehicle Factory",
        "exportlocation": "",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Chassis": {
                "reagents": {
                    "refined_amalgam": 15
                },
                "out_money": 0,
                "in_money": 100000,
                "aptitudes": {
                    "trucking.trucking": 13.0,
                    "physical.strength": 13.0,
                    "player.player": 12.0
                },
                "description": "Chassis",
                "products": {
                    "mechanicals_chassis": 1
                },
                "location": "Vehicle Parts"
            }
        },
        "usage": {
            "HVY Nightshark": {
                "reagents": {
                    "liquid_water": 1,
                    "mechanicals_wheels": 4,
                    "crafted_fiberglass": 25,
                    "military_titanium": 60,
                    "mechanicals_vehicle_framework": 2,
                    "mechanicals_battery": 2,
                    "mechanicals_chassis": 2,
                    "crafted_circuit": 12,
                    "refined_glass": 15,
                    "refined_amalgam": 40,
                    "liberty_military_goods": 4
                },
                "description": "HVY Nightshark",
                "out_money": 0,
                "in_money": 13780000,
                "aptitudes": {
                    "trucking.trucking": 13.0,
                    "physical.strength": 13.0,
                    "player.player": 12.0
                },
                "products": {
                    "vehicle_shipment|nightshark|HVY Nightshark|car": 1
                },
                "location": "Vehicle Factory"
            },
            "Karin Futo": {
                "reagents": {
                    "mechanicals_chassis": 1,
                    "mechanicals_wheels": 4,
                    "crafted_fiberglass": 15,
                    "refined_amalgam": 50,
                    "crafted_circuit": 5,
                    "mechanicals_battery": 1,
                    "refined_glass": 25,
                    "mechanicals_vehicle_framework": 1
                },
                "description": "Karin Futo",
                "out_money": 0,
                "in_money": 220000,
                "aptitudes": {
                    "trucking.trucking": 13.0,
                    "physical.strength": 13.0,
                    "player.player": 12.0
                },
                "products": {
                    "vehicle_shipment|futo|Karin Futo|car": 1
                },
                "location": "Vehicle Factory"
            },
            "Coil Savanna": {
                "reagents": {
                    "mechanicals_battery": 1,
                    "crafted_fiberglass": 35,
                    "refined_amalgam": 50,
                    "crafted_circuit": 5,
                    "mechanicals_chassis": 1,
                    "refined_glass": 25,
                    "mechanicals_wheels": 4,
                    "mechanicals_battery_evb": 3,
                    "mechanicals_vehicle_framework": 1
                },
                "description": "Coil Savanna",
                "out_money": 0,
                "in_money": 8380000,
                "aptitudes": {
                    "trucking.trucking": 13.0,
                    "physical.strength": 13.0,
                    "player.player": 12.0
                },
                "products": {
                    "vehicle_shipment|savanna|Coil Savanna|car": 1
                },
                "location": "Vehicle Factory"
            },
            "Annis ZR-350": {
                "reagents": {
                    "mechanicals_chassis": 1,
                    "mechanicals_wheels": 4,
                    "crafted_fiberglass": 15,
                    "refined_amalgam": 50,
                    "crafted_circuit": 5,
                    "mechanicals_battery": 1,
                    "refined_glass": 25,
                    "mechanicals_vehicle_framework": 1
                },
                "description": "Annis ZR-350",
                "out_money": 0,
                "in_money": 1620000,
                "aptitudes": {
                    "trucking.trucking": 13.0,
                    "physical.strength": 13.0,
                    "player.player": 12.0
                },
                "products": {
                    "vehicle_shipment|zr350|Annis ZR-350|car": 1
                },
                "location": "Vehicle Factory"
            },
            "Hijak Vertice": {
                "reagents": {
                    "mechanicals_chassis": 1,
                    "mechanicals_wheels": 4,
                    "crafted_fiberglass": 15,
                    "refined_amalgam": 50,
                    "crafted_circuit": 5,
                    "mechanicals_battery": 1,
                    "refined_glass": 25,
                    "mechanicals_vehicle_framework": 1
                },
                "description": "Hijak Vertice",
                "out_money": 0,
                "in_money": 320000,
                "aptitudes": {
                    "trucking.trucking": 13.0,
                    "physical.strength": 13.0,
                    "player.player": 12.0
                },
                "products": {
                    "vehicle_shipment|vertice|Hijak Vertice|car": 1
                },
                "location": "Vehicle Factory"
            },
            "Coil Rocket Voltic": {
                "reagents": {
                    "mechanicals_wheels": 4,
                    "crafted_fiberglass": 15,
                    "petrochem_kerosene": 100,
                    "mechanicals_chassis": 1,
                    "refined_amalgam": 50,
                    "refined_glass": 25,
                    "mechanicals_battery": 1,
                    "crafted_circuit": 5,
                    "mechanicals_vehicle_framework": 1
                },
                "description": "Coil Rocket Voltic",
                "out_money": 0,
                "in_money": 90110000,
                "aptitudes": {
                    "trucking.trucking": 13.0,
                    "physical.strength": 13.0,
                    "player.player": 12.0
                },
                "products": {
                    "upgrade_kit_voltic2": 1
                },
                "location": "Vehicle Factory"
            },
            "Landstalker XL": {
                "permissionsText": "Landstalker XL Blueprints Secret",
                "in_money": 32000000,
                "aptitudes": {
                    "trucking.trucking": 130.0,
                    "physical.strength": 130.0,
                    "player.player": 120.0
                },
                "products": {
                    "vehicle_shipment|landstalker2|Landstalker XL|car": 1
                },
                "secret": true,
                "description": "Landstalker XL",
                "reagents": {
                    "mechanicals_chassis": 1,
                    "mechanicals_wheels": 4,
                    "crafted_fiberglass": 30,
                    "refined_amalgam": 100,
                    "crafted_circuit": 10,
                    "mechanicals_battery": 2,
                    "refined_glass": 50,
                    "mechanicals_vehicle_framework": 1
                },
                "permissions": [
                    "sd.trucking.shipment.landstalker2"
                ],
                "out_money": 0,
                "location": "Vehicle Factory"
            },
            "Temporary Repair Shop": {
                "reagents": {
                    "military_titanium": 2,
                    "mechanicals_wheels": 2,
                    "pucargosmall": 2,
                    "mechanicals_chassis": 2
                },
                "out_money": 0,
                "in_money": 1500000,
                "aptitudes": {
                    "trucking.trucking": 13.0,
                    "physical.strength": 13.0,
                    "player.player": 12.0
                },
                "description": "Temporary Repair Shop",
                "products": {
                    "repair_shop": 1
                },
                "location": "Vehicle Parts"
            }
        },
        "export": {},
        "key": "mechanicals_chassis"
    },
    "Chemicals": {
        "name": "Chemicals",
        "jobs": {
            "petrochem": true
        },
        "value": 0,
        "pickuplocation": "",
        "craftlocation": "Refinery",
        "usagelocation": "Chemical Laboratories",
        "exportlocation": "",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Refine Raw Gas x2": {
                "reagents": {
                    "petrochem_gas": 2
                },
                "out_money": 0,
                "in_money": 20500,
                "aptitudes": {
                    "trucking.trucking": 12.64,
                    "physical.strength": 12.64,
                    "player.player": 12.64
                },
                "description": "Refine Raw Gas x2",
                "products": {
                    "petrochem_propane": 4,
                    "military_chemicals": 4,
                    "petrochem_waste": 2
                },
                "location": "Refinery"
            },
            "Refine Raw Gas": {
                "reagents": {
                    "petrochem_gas": 1
                },
                "out_money": 0,
                "in_money": 10250,
                "aptitudes": {
                    "trucking.trucking": 6.32,
                    "physical.strength": 6.32,
                    "player.player": 6.32
                },
                "description": "Refine Raw Gas",
                "products": {
                    "petrochem_propane": 2,
                    "military_chemicals": 2,
                    "petrochem_waste": 1
                },
                "location": "Refinery"
            }
        },
        "usage": {
            "Refine Chemicals x10": {
                "reagents": {
                    "military_chemicals": 10
                },
                "out_money": 0,
                "in_money": 25000,
                "aptitudes": {
                    "trucking.trucking": 10.0,
                    "physical.strength": 10.0,
                    "player.player": 10.0
                },
                "description": "Refine Chemicals x10",
                "products": {
                    "scrap_acid": 40
                },
                "location": "Chemical Laboratories"
            },
            "Refine Chemicals": {
                "reagents": {
                    "military_chemicals": 1
                },
                "out_money": 0,
                "in_money": 2500,
                "aptitudes": {
                    "trucking.trucking": 1.0,
                    "physical.strength": 1.0,
                    "player.player": 1.0
                },
                "description": "Refine Chemicals",
                "products": {
                    "scrap_acid": 4
                },
                "location": "Chemical Laboratories"
            }
        },
        "export": {},
        "key": "military_chemicals"
    },
    "Circuit Board": {
        "name": "Circuit Board",
        "jobs": {
            "trucker": true,
            "premium.trucking": true
        },
        "value": 90000,
        "pickuplocation": "",
        "craftlocation": "LS Factory",
        "usagelocation": "Vehicle Factory",
        "exportlocation": "Electronics Store",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Create Circuit Boards x10": {
                "reagents": {
                    "refined_solder": 20,
                    "crafted_copperwire": 10,
                    "scrap_plastic": 100
                },
                "out_money": 0,
                "in_money": 50000,
                "aptitudes": {
                    "trucking.trucking": 26.8,
                    "physical.strength": 26.8,
                    "player.player": 26.8
                },
                "description": "Make 10 Circuit Boards",
                "products": {
                    "crafted_circuit": 20
                },
                "location": "LS Factory"
            },
            "Create Circuit Boards": {
                "reagents": {
                    "refined_solder": 2,
                    "crafted_copperwire": 1,
                    "scrap_plastic": 10
                },
                "out_money": 0,
                "in_money": 5000,
                "aptitudes": {
                    "trucking.trucking": 2.68,
                    "physical.strength": 2.68,
                    "player.player": 2.68
                },
                "description": "Make Circuit Boards",
                "products": {
                    "crafted_circuit": 2
                },
                "location": "LS Factory"
            }
        },
        "usage": {
            "HVY Nightshark": {
                "reagents": {
                    "liquid_water": 1,
                    "mechanicals_wheels": 4,
                    "crafted_fiberglass": 25,
                    "military_titanium": 60,
                    "mechanicals_vehicle_framework": 2,
                    "mechanicals_battery": 2,
                    "mechanicals_chassis": 2,
                    "crafted_circuit": 12,
                    "refined_glass": 15,
                    "refined_amalgam": 40,
                    "liberty_military_goods": 4
                },
                "description": "HVY Nightshark",
                "out_money": 0,
                "in_money": 13780000,
                "aptitudes": {
                    "trucking.trucking": 13.0,
                    "physical.strength": 13.0,
                    "player.player": 12.0
                },
                "products": {
                    "vehicle_shipment|nightshark|HVY Nightshark|car": 1
                },
                "location": "Vehicle Factory"
            },
            "Karin Futo": {
                "reagents": {
                    "mechanicals_chassis": 1,
                    "mechanicals_wheels": 4,
                    "crafted_fiberglass": 15,
                    "refined_amalgam": 50,
                    "crafted_circuit": 5,
                    "mechanicals_battery": 1,
                    "refined_glass": 25,
                    "mechanicals_vehicle_framework": 1
                },
                "description": "Karin Futo",
                "out_money": 0,
                "in_money": 220000,
                "aptitudes": {
                    "trucking.trucking": 13.0,
                    "physical.strength": 13.0,
                    "player.player": 12.0
                },
                "products": {
                    "vehicle_shipment|futo|Karin Futo|car": 1
                },
                "location": "Vehicle Factory"
            },
            "Coil Savanna": {
                "reagents": {
                    "mechanicals_battery": 1,
                    "crafted_fiberglass": 35,
                    "refined_amalgam": 50,
                    "crafted_circuit": 5,
                    "mechanicals_chassis": 1,
                    "refined_glass": 25,
                    "mechanicals_wheels": 4,
                    "mechanicals_battery_evb": 3,
                    "mechanicals_vehicle_framework": 1
                },
                "description": "Coil Savanna",
                "out_money": 0,
                "in_money": 8380000,
                "aptitudes": {
                    "trucking.trucking": 13.0,
                    "physical.strength": 13.0,
                    "player.player": 12.0
                },
                "products": {
                    "vehicle_shipment|savanna|Coil Savanna|car": 1
                },
                "location": "Vehicle Factory"
            },
            "Annis ZR-350": {
                "reagents": {
                    "mechanicals_chassis": 1,
                    "mechanicals_wheels": 4,
                    "crafted_fiberglass": 15,
                    "refined_amalgam": 50,
                    "crafted_circuit": 5,
                    "mechanicals_battery": 1,
                    "refined_glass": 25,
                    "mechanicals_vehicle_framework": 1
                },
                "description": "Annis ZR-350",
                "out_money": 0,
                "in_money": 1620000,
                "aptitudes": {
                    "trucking.trucking": 13.0,
                    "physical.strength": 13.0,
                    "player.player": 12.0
                },
                "products": {
                    "vehicle_shipment|zr350|Annis ZR-350|car": 1
                },
                "location": "Vehicle Factory"
            },
            "Hijak Vertice": {
                "reagents": {
                    "mechanicals_chassis": 1,
                    "mechanicals_wheels": 4,
                    "crafted_fiberglass": 15,
                    "refined_amalgam": 50,
                    "crafted_circuit": 5,
                    "mechanicals_battery": 1,
                    "refined_glass": 25,
                    "mechanicals_vehicle_framework": 1
                },
                "description": "Hijak Vertice",
                "out_money": 0,
                "in_money": 320000,
                "aptitudes": {
                    "trucking.trucking": 13.0,
                    "physical.strength": 13.0,
                    "player.player": 12.0
                },
                "products": {
                    "vehicle_shipment|vertice|Hijak Vertice|car": 1
                },
                "location": "Vehicle Factory"
            },
            "Coil Rocket Voltic": {
                "reagents": {
                    "mechanicals_wheels": 4,
                    "crafted_fiberglass": 15,
                    "petrochem_kerosene": 100,
                    "mechanicals_chassis": 1,
                    "refined_amalgam": 50,
                    "refined_glass": 25,
                    "mechanicals_battery": 1,
                    "crafted_circuit": 5,
                    "mechanicals_vehicle_framework": 1
                },
                "description": "Coil Rocket Voltic",
                "out_money": 0,
                "in_money": 90110000,
                "aptitudes": {
                    "trucking.trucking": 13.0,
                    "physical.strength": 13.0,
                    "player.player": 12.0
                },
                "products": {
                    "upgrade_kit_voltic2": 1
                },
                "location": "Vehicle Factory"
            },
            "Landstalker XL": {
                "permissionsText": "Landstalker XL Blueprints Secret",
                "in_money": 32000000,
                "aptitudes": {
                    "trucking.trucking": 130.0,
                    "physical.strength": 130.0,
                    "player.player": 120.0
                },
                "products": {
                    "vehicle_shipment|landstalker2|Landstalker XL|car": 1
                },
                "secret": true,
                "description": "Landstalker XL",
                "reagents": {
                    "mechanicals_chassis": 1,
                    "mechanicals_wheels": 4,
                    "crafted_fiberglass": 30,
                    "refined_amalgam": 100,
                    "crafted_circuit": 10,
                    "mechanicals_battery": 2,
                    "refined_glass": 50,
                    "mechanicals_vehicle_framework": 1
                },
                "permissions": [
                    "sd.trucking.shipment.landstalker2"
                ],
                "out_money": 0,
                "location": "Vehicle Factory"
            },
            "Create Computer": {
                "reagents": {
                    "crafted_circuit": 1,
                    "crafted_batteries": 1,
                    "scrap_gold": 2
                },
                "out_money": 0,
                "in_money": 5000,
                "aptitudes": {
                    "trucking.trucking": 3.81,
                    "physical.strength": 3.81,
                    "player.player": 3.81
                },
                "description": "Make Computers",
                "products": {
                    "crafted_computer": 2
                },
                "location": "LS Factory"
            },
            "Create Computer x10": {
                "reagents": {
                    "crafted_circuit": 10,
                    "crafted_batteries": 10,
                    "scrap_gold": 20
                },
                "out_money": 0,
                "in_money": 50000,
                "aptitudes": {
                    "trucking.trucking": 38.1,
                    "physical.strength": 38.1,
                    "player.player": 38.1
                },
                "description": "Make 10 Computers",
                "products": {
                    "crafted_computer": 20
                },
                "location": "LS Factory"
            }
        },
        "export": {
            "Deliver Circuit Boards x10": {
                "reagents": {
                    "crafted_circuit": 10
                },
                "out_money": 900000,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 5.69999999999999,
                    "physical.strength": 5.69999999999999,
                    "player.player": 5.69999999999999
                },
                "description": "Sell Circuit Boards",
                "products": [],
                "location": "Electronics Store"
            },
            "Deliver Circuit Boards": {
                "reagents": {
                    "crafted_circuit": 1
                },
                "out_money": 90000,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 0.57,
                    "physical.strength": 0.57,
                    "player.player": 0.57
                },
                "description": "Sell Circuit Boards",
                "products": [],
                "location": "Electronics Store"
            }
        },
        "key": "crafted_circuit"
    },
    "Coil Savanna": {
        "name": "Coil Savanna",
        "jobs": {
            "premium.trucking": true
        },
        "value": 0,
        "pickuplocation": "",
        "craftlocation": "Vehicle Factory",
        "usagelocation": "",
        "exportlocation": "",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Coil Savanna": {
                "reagents": {
                    "mechanicals_battery": 1,
                    "crafted_fiberglass": 35,
                    "refined_amalgam": 50,
                    "crafted_circuit": 5,
                    "mechanicals_chassis": 1,
                    "refined_glass": 25,
                    "mechanicals_wheels": 4,
                    "mechanicals_battery_evb": 3,
                    "mechanicals_vehicle_framework": 1
                },
                "description": "Coil Savanna",
                "out_money": 0,
                "in_money": 8380000,
                "aptitudes": {
                    "trucking.trucking": 13.0,
                    "physical.strength": 13.0,
                    "player.player": 12.0
                },
                "products": {
                    "vehicle_shipment|savanna|Coil Savanna|car": 1
                },
                "location": "Vehicle Factory"
            }
        },
        "usage": {},
        "export": {},
        "key": "vehicle_shipment|savanna|Coil Savanna|car"
    },
    "Computer": {
        "name": "Computer",
        "jobs": {
            "trucker": true
        },
        "value": 210000,
        "pickuplocation": "",
        "craftlocation": "LS Factory",
        "usagelocation": "",
        "exportlocation": "House Construction Site",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Create Computer": {
                "reagents": {
                    "crafted_circuit": 1,
                    "crafted_batteries": 1,
                    "scrap_gold": 2
                },
                "out_money": 0,
                "in_money": 5000,
                "aptitudes": {
                    "trucking.trucking": 3.81,
                    "physical.strength": 3.81,
                    "player.player": 3.81
                },
                "description": "Make Computers",
                "products": {
                    "crafted_computer": 2
                },
                "location": "LS Factory"
            },
            "Create Computer x10": {
                "reagents": {
                    "crafted_circuit": 10,
                    "crafted_batteries": 10,
                    "scrap_gold": 20
                },
                "out_money": 0,
                "in_money": 50000,
                "aptitudes": {
                    "trucking.trucking": 38.1,
                    "physical.strength": 38.1,
                    "player.player": 38.1
                },
                "description": "Make 10 Computers",
                "products": {
                    "crafted_computer": 20
                },
                "location": "LS Factory"
            }
        },
        "usage": {},
        "export": {
            "House Construction": {
                "reagents": {
                    "refined_planks": 2,
                    "crafted_concrete": 1,
                    "crafted_ceramictiles": 4,
                    "crafted_copperwire": 1,
                    "crafted_computer": 1,
                    "crafted_rebar": 1
                },
                "description": "Construct a House",
                "out_money": 2350000,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 87.49,
                    "physical.strength": 87.49,
                    "player.player": 87.49
                },
                "products": [],
                "location": "House Construction Site"
            },
            "Computer x10": {
                "reagents": {
                    "crafted_computer": 10
                },
                "out_money": 2100000,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 14.1,
                    "physical.strength": 14.1,
                    "player.player": 14.1
                },
                "description": "Sell Computers",
                "products": [],
                "location": "LS Port Export"
            },
            "Computer": {
                "reagents": {
                    "crafted_computer": 1
                },
                "out_money": 210000,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 1.41,
                    "physical.strength": 1.41,
                    "player.player": 1.41
                },
                "description": "Sell Computers",
                "products": [],
                "location": "LS Port Export"
            }
        },
        "key": "crafted_computer"
    },
    "Concrete": {
        "name": "Concrete",
        "jobs": {
            "trucker": true
        },
        "value": 800000,
        "pickuplocation": "",
        "craftlocation": "Filtering Plant",
        "usagelocation": "",
        "exportlocation": "Alta Construction Site",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Mix Concrete x2": {
                "reagents": {
                    "liquid_water": 2,
                    "crafted_cement": 10
                },
                "out_money": 0,
                "in_money": 30000,
                "aptitudes": {
                    "trucking.trucking": 21.7,
                    "physical.strength": 21.7,
                    "player.player": 21.7
                },
                "description": "Mix a batch of concrete",
                "products": {
                    "crafted_concrete": 2
                },
                "location": "Filtering Plant"
            },
            "Mix Concrete": {
                "reagents": {
                    "liquid_water": 1,
                    "crafted_cement": 5
                },
                "out_money": 0,
                "in_money": 15000,
                "aptitudes": {
                    "trucking.trucking": 10.85,
                    "physical.strength": 10.85,
                    "player.player": 10.85
                },
                "description": "Mix a batch of concrete",
                "products": {
                    "crafted_concrete": 1
                },
                "location": "Filtering Plant"
            }
        },
        "usage": {},
        "export": {
            "Deliver Concrete": {
                "reagents": {
                    "crafted_concrete": 1
                },
                "description": "Deliver Concrete to the construction site",
                "out_money": 800000,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 10.91,
                    "physical.strength": 10.91,
                    "player.player": 10.91
                },
                "products": [],
                "location": "Alta Construction Site"
            },
            "Deliver Concrete x2": {
                "reagents": {
                    "crafted_concrete": 2
                },
                "description": "Deliver Concrete to the construction site",
                "out_money": 1600000,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 21.82,
                    "physical.strength": 21.82,
                    "player.player": 21.82
                },
                "products": [],
                "location": "Alta Construction Site"
            },
            "House Construction": {
                "reagents": {
                    "refined_planks": 2,
                    "crafted_concrete": 1,
                    "crafted_ceramictiles": 4,
                    "crafted_copperwire": 1,
                    "crafted_computer": 1,
                    "crafted_rebar": 1
                },
                "description": "Construct a House",
                "out_money": 2350000,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 87.49,
                    "physical.strength": 87.49,
                    "player.player": 87.49
                },
                "products": [],
                "location": "House Construction Site"
            }
        },
        "key": "crafted_concrete"
    },
    "Copper Wire": {
        "name": "Copper Wire",
        "jobs": {
            "trucker": true
        },
        "value": 55000,
        "pickuplocation": "",
        "craftlocation": "LS Factory",
        "usagelocation": "LS Factory",
        "exportlocation": "House Construction Site",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Create Copper Wire Spool x5": {
                "reagents": {
                    "refined_planks": 5,
                    "refined_copper": 20
                },
                "out_money": 0,
                "in_money": 25000,
                "aptitudes": {
                    "trucking.trucking": 14.5,
                    "physical.strength": 14.5,
                    "player.player": 14.5
                },
                "description": "Create spools of copper wire",
                "products": {
                    "crafted_copperwire": 10
                },
                "location": "LS Factory"
            },
            "Create Copper Wire Spool": {
                "reagents": {
                    "refined_planks": 1,
                    "refined_copper": 4
                },
                "out_money": 0,
                "in_money": 5000,
                "aptitudes": {
                    "trucking.trucking": 2.9,
                    "physical.strength": 2.9,
                    "player.player": 2.9
                },
                "description": "Create spools of copper wire",
                "products": {
                    "crafted_copperwire": 2
                },
                "location": "LS Factory"
            }
        },
        "usage": {
            "Create Circuit Boards x10": {
                "reagents": {
                    "refined_solder": 20,
                    "crafted_copperwire": 10,
                    "scrap_plastic": 100
                },
                "out_money": 0,
                "in_money": 50000,
                "aptitudes": {
                    "trucking.trucking": 26.8,
                    "physical.strength": 26.8,
                    "player.player": 26.8
                },
                "description": "Make 10 Circuit Boards",
                "products": {
                    "crafted_circuit": 20
                },
                "location": "LS Factory"
            },
            "Create Circuit Boards": {
                "reagents": {
                    "refined_solder": 2,
                    "crafted_copperwire": 1,
                    "scrap_plastic": 10
                },
                "out_money": 0,
                "in_money": 5000,
                "aptitudes": {
                    "trucking.trucking": 2.68,
                    "physical.strength": 2.68,
                    "player.player": 2.68
                },
                "description": "Make Circuit Boards",
                "products": {
                    "crafted_circuit": 2
                },
                "location": "LS Factory"
            }
        },
        "export": {
            "House Construction": {
                "reagents": {
                    "refined_planks": 2,
                    "crafted_concrete": 1,
                    "crafted_ceramictiles": 4,
                    "crafted_copperwire": 1,
                    "crafted_computer": 1,
                    "crafted_rebar": 1
                },
                "description": "Construct a House",
                "out_money": 2350000,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 87.49,
                    "physical.strength": 87.49,
                    "player.player": 87.49
                },
                "products": [],
                "location": "House Construction Site"
            },
            "Deliver Copper Wire Spool": {
                "reagents": {
                    "crafted_copperwire": 1
                },
                "out_money": 55000,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 0.35,
                    "physical.strength": 0.35,
                    "player.player": 0.35
                },
                "description": "Deliver a shipment of copper wire.",
                "products": [],
                "location": "Electronics Store"
            },
            "Deliver Copper Wire Spool x10": {
                "reagents": {
                    "crafted_copperwire": 10
                },
                "out_money": 550000,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 3.5,
                    "physical.strength": 3.5,
                    "player.player": 3.5
                },
                "description": "Deliver a shipment of copper wire.",
                "products": [],
                "location": "Electronics Store"
            }
        },
        "key": "crafted_copperwire"
    },
    "Crude Oil": {
        "name": "Crude Oil",
        "jobs": {
            "petrochem": true
        },
        "value": 0,
        "pickuplocation": "LS Oil Pumping Station",
        "craftlocation": "",
        "usagelocation": "Refinery",
        "exportlocation": "",
        "permissions": "",
        "pickup": {
            "Extract Crude Oil": {
                "reagents": [],
                "out_money": 0,
                "in_money": 0,
                "aptitudes": [],
                "description": "Extract Crude Oil",
                "products": {
                    "petrochem_oil": 1
                },
                "location": "LS Oil Pumping Station"
            },
            "Extract Crude Oil x2": {
                "reagents": [],
                "out_money": 0,
                "in_money": 0,
                "aptitudes": [],
                "description": "Extract Crude Oil x2",
                "products": {
                    "petrochem_oil": 2
                },
                "location": "LS Oil Pumping Station"
            }
        },
        "crafting": {},
        "usage": {
            "Refine Rubber": {
                "reagents": {
                    "petrochem_oil": 4
                },
                "out_money": 0,
                "in_money": 41000,
                "aptitudes": [],
                "description": "Refine Rubber",
                "products": {
                    "mechanicals_rubber": 4,
                    "petrochem_diesel": 2,
                    "petrochem_petrol": 4,
                    "petrochem_kerosene": 2
                },
                "location": "Refinery"
            },
            "Refine Crude Oil x2": {
                "reagents": {
                    "petrochem_oil": 2
                },
                "out_money": 0,
                "in_money": 20500,
                "aptitudes": {
                    "trucking.trucking": 12.9,
                    "physical.strength": 12.9,
                    "player.player": 12.9
                },
                "description": "Refine Crude Oil x2",
                "products": {
                    "petrochem_diesel": 2,
                    "petrochem_petrol": 4,
                    "petrochem_kerosene": 2
                },
                "location": "Refinery"
            },
            "Refine Diluted Fuel": {
                "permissionsText": "Diluted Fuel Refining Secret",
                "in_money": 10250,
                "aptitudes": {
                    "trucking.trucking": 8.81,
                    "physical.strength": 8.81,
                    "player.player": 8.81
                },
                "products": {
                    "petrochem_diesel": 3,
                    "petrochem_petrol": 3,
                    "petrochem_kerosene": 20
                },
                "secret": true,
                "description": "Refine Diluted Fuel",
                "reagents": {
                    "petrochem_oil": 3,
                    "liquid_water": 2
                },
                "permissions": [
                    "sd.trucking.dilutedfuel"
                ],
                "out_money": 0,
                "location": "Refinery"
            },
            "Create Asphalt": {
                "permissionsText": "Asphalt Concrete Refining Secret",
                "in_money": 10250,
                "aptitudes": {
                    "trucking.trucking": 8.81,
                    "physical.strength": 8.81,
                    "player.player": 8.81
                },
                "products": {
                    "petrochem_asphalt": 20
                },
                "secret": true,
                "description": "Create Asphalt",
                "reagents": {
                    "petrochem_oil": 1,
                    "scrap_gravel": 20
                },
                "permissions": [
                    "sd.trucking.asphalt"
                ],
                "out_money": 0,
                "location": "Refinery"
            },
            "Refine Crude Oil": {
                "reagents": {
                    "petrochem_oil": 1
                },
                "out_money": 0,
                "in_money": 10250,
                "aptitudes": {
                    "trucking.trucking": 6.45,
                    "physical.strength": 6.45,
                    "player.player": 6.45
                },
                "description": "Refine Crude Oil",
                "products": {
                    "petrochem_diesel": 1,
                    "petrochem_petrol": 2,
                    "petrochem_kerosene": 1
                },
                "location": "Refinery"
            }
        },
        "export": {},
        "key": "petrochem_oil"
    },
    "Dairy Products": {
        "name": "Dairy Products",
        "jobs": {
            "fridge": true
        },
        "value": 0,
        "pickuplocation": "Grapeseed Farms",
        "craftlocation": "",
        "usagelocation": "Fridgit Co.",
        "exportlocation": "",
        "permissions": "",
        "pickup": {
            "Pick up Dairy x10": {
                "reagents": [],
                "out_money": 0,
                "in_money": 0,
                "aptitudes": [],
                "description": "Pick up Dairy",
                "products": {
                    "fridge_dairy": 10
                },
                "location": "Grapeseed Farms"
            },
            "Pick up Dairy": {
                "reagents": [],
                "out_money": 0,
                "in_money": 0,
                "aptitudes": [],
                "description": "Pick up Dairy",
                "products": {
                    "fridge_dairy": 1
                },
                "location": "Grapeseed Farms"
            }
        },
        "crafting": {},
        "usage": {
            "Create Airline Meal x10": {
                "reagents": {
                    "fridge_veggies": 10,
                    "fridge_meat": 10,
                    "fridge_dairy": 10
                },
                "out_money": 0,
                "in_money": 25000,
                "aptitudes": {
                    "trucking.trucking": 52.4,
                    "physical.strength": 52.4,
                    "player.player": 52.4
                },
                "description": "Create Airline Meal x10",
                "products": {
                    "fridge_airline_meal": 40
                },
                "location": "Fridgit Co."
            },
            "Create Dairy Shipment x10": {
                "reagents": {
                    "fridge_dairy": 40
                },
                "out_money": 0,
                "in_money": 25000,
                "aptitudes": {
                    "trucking.trucking": 32.59999999999999,
                    "physical.strength": 32.59999999999999,
                    "player.player": 32.59999999999999
                },
                "description": "Dairy to Food Shipment x10",
                "products": {
                    "fridge_store_delivery": 50
                },
                "location": "Fridgit Co."
            },
            "Create Airline Meal": {
                "reagents": {
                    "fridge_veggies": 1,
                    "fridge_meat": 1,
                    "fridge_dairy": 1
                },
                "out_money": 0,
                "in_money": 2500,
                "aptitudes": {
                    "trucking.trucking": 5.24,
                    "physical.strength": 5.24,
                    "player.player": 5.24
                },
                "description": "Create Airline Meal",
                "products": {
                    "fridge_airline_meal": 4
                },
                "location": "Fridgit Co."
            },
            "Create Dairy Shipment": {
                "reagents": {
                    "fridge_dairy": 4
                },
                "out_money": 0,
                "in_money": 2500,
                "aptitudes": {
                    "trucking.trucking": 3.26,
                    "physical.strength": 3.26,
                    "player.player": 3.26
                },
                "description": "Dairy to Food Shipment",
                "products": {
                    "fridge_store_delivery": 5
                },
                "location": "Fridgit Co."
            }
        },
        "export": {},
        "key": "fridge_dairy"
    },
    "Defib Kit": {
        "name": "Defib Kit",
        "jobs": {
            "trucker": true
        },
        "value": 0,
        "pickuplocation": "",
        "craftlocation": "Defib Kit Charging",
        "usagelocation": "",
        "exportlocation": "",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Charge Empty Defib Kit": {
                "in_money": 5000,
                "aptitudes": {
                    "player.player": 0.1,
                    "trucking.trucking": 0.5
                },
                "products": {
                    "defibkit": 1
                },
                "onSelect": false,
                "reagents": {
                    "e_defibkit": 1
                },
                "out_money": 0,
                "description": "Charged Defib Kits",
                "onLeave": false,
                "onTransform": false,
                "cost": 1,
                "location": "Defib Kit Charging"
            }
        },
        "usage": {},
        "export": {},
        "key": "defibkit"
    },
    "Diesel": {
        "name": "Diesel",
        "jobs": {
            "petrochem": true
        },
        "value": 12000,
        "pickuplocation": "",
        "craftlocation": "Refinery",
        "usagelocation": "Oil Depository",
        "exportlocation": "Bristols Fuel Storage",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Refine Rubber": {
                "reagents": {
                    "petrochem_oil": 4
                },
                "out_money": 0,
                "in_money": 41000,
                "aptitudes": [],
                "description": "Refine Rubber",
                "products": {
                    "mechanicals_rubber": 4,
                    "petrochem_diesel": 2,
                    "petrochem_petrol": 4,
                    "petrochem_kerosene": 2
                },
                "location": "Refinery"
            },
            "Refine Crude Oil x2": {
                "reagents": {
                    "petrochem_oil": 2
                },
                "out_money": 0,
                "in_money": 20500,
                "aptitudes": {
                    "trucking.trucking": 12.9,
                    "physical.strength": 12.9,
                    "player.player": 12.9
                },
                "description": "Refine Crude Oil x2",
                "products": {
                    "petrochem_diesel": 2,
                    "petrochem_petrol": 4,
                    "petrochem_kerosene": 2
                },
                "location": "Refinery"
            },
            "Refine Diluted Fuel": {
                "permissionsText": "Diluted Fuel Refining Secret",
                "in_money": 10250,
                "aptitudes": {
                    "trucking.trucking": 8.81,
                    "physical.strength": 8.81,
                    "player.player": 8.81
                },
                "products": {
                    "petrochem_diesel": 3,
                    "petrochem_petrol": 3,
                    "petrochem_kerosene": 20
                },
                "secret": true,
                "description": "Refine Diluted Fuel",
                "reagents": {
                    "petrochem_oil": 3,
                    "liquid_water": 2
                },
                "permissions": [
                    "sd.trucking.dilutedfuel"
                ],
                "out_money": 0,
                "location": "Refinery"
            },
            "Refine Crude Oil": {
                "reagents": {
                    "petrochem_oil": 1
                },
                "out_money": 0,
                "in_money": 10250,
                "aptitudes": {
                    "trucking.trucking": 6.45,
                    "physical.strength": 6.45,
                    "player.player": 6.45
                },
                "description": "Refine Crude Oil",
                "products": {
                    "petrochem_diesel": 1,
                    "petrochem_petrol": 2,
                    "petrochem_kerosene": 1
                },
                "location": "Refinery"
            }
        },
        "usage": {
            "Fill Boat Cans": {
                "reagents": {
                    "petrochem_diesel": 1
                },
                "out_money": 8000,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 1.9,
                    "physical.strength": 1.9,
                    "player.player": 1.9
                },
                "description": "Fill Boat Cans",
                "products": {
                    "jerry_can|BOAT|Boat": 10
                },
                "location": "Oil Depository"
            },
            "Fill Diesel Cans": {
                "reagents": {
                    "petrochem_diesel": 1
                },
                "out_money": 8000,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 1.9,
                    "physical.strength": 1.9,
                    "player.player": 1.9
                },
                "description": "Fill Diesel Cans",
                "products": {
                    "jerry_can|HEAVY|Diesel": 10
                },
                "location": "Oil Depository"
            }
        },
        "export": {
            "Sell Diesel x10": {
                "reagents": {
                    "petrochem_diesel": 10
                },
                "out_money": 120000,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 3.9,
                    "physical.strength": 3.9,
                    "player.player": 3.9
                },
                "description": "Sell Diesel",
                "products": [],
                "location": "Bristols Fuel Storage"
            },
            "Sell Diesel": {
                "reagents": {
                    "petrochem_diesel": 1
                },
                "out_money": 12000,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 0.39,
                    "physical.strength": 0.39,
                    "player.player": 0.39
                },
                "description": "Sell Diesel",
                "products": [],
                "location": "Bristols Fuel Storage"
            }
        },
        "key": "petrochem_diesel"
    },
    "Diesel Fuel": {
        "name": "Diesel Fuel",
        "jobs": {
            "petrochem": true
        },
        "value": 0,
        "pickuplocation": "",
        "craftlocation": "Oil Depository",
        "usagelocation": "",
        "exportlocation": "",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Fill Diesel Cans": {
                "reagents": {
                    "petrochem_diesel": 1
                },
                "out_money": 8000,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 1.9,
                    "physical.strength": 1.9,
                    "player.player": 1.9
                },
                "description": "Fill Diesel Cans",
                "products": {
                    "jerry_can|HEAVY|Diesel": 10
                },
                "location": "Oil Depository"
            }
        },
        "usage": {},
        "export": {},
        "key": "jerry_can|HEAVY|Diesel"
    },
    "Empty Box Capsules": {
        "name": "Empty Box Capsules",
        "jobs": {
            "trucker": true
        },
        "value": 0,
        "pickuplocation": "",
        "craftlocation": "Plastic Molding",
        "usagelocation": "Liquor Ace",
        "exportlocation": "",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Craft Empty Pill Capsule": {
                "in_money": 1000,
                "aptitudes": {
                    "player.player": 0.1,
                    "trucking.trucking": 0.5
                },
                "products": {
                    "empty_box_capsules": 5
                },
                "onSelect": false,
                "reagents": {
                    "scrap_plastic": 10
                },
                "out_money": 0,
                "description": "Pills Capsule",
                "onLeave": false,
                "onTransform": false,
                "cost": 1,
                "location": "Plastic Molding"
            }
        },
        "usage": {
            "Fill empty pill box": {
                "in_money": 5000,
                "aptitudes": [],
                "products": {
                    "full_box_capsules": 1
                },
                "onSelect": false,
                "reagents": {
                    "empty_box_capsules": 1
                },
                "out_money": 0,
                "description": "Methamphetamine",
                "onLeave": false,
                "onTransform": false,
                "cost": 1,
                "location": "Liquor Ace"
            }
        },
        "export": {},
        "key": "empty_box_capsules"
    },
    "Empty Defib Kit": {
        "name": "Empty Defib Kit",
        "jobs": {
            "trucker": true
        },
        "value": 0,
        "pickuplocation": "",
        "craftlocation": "Plastic Molding",
        "usagelocation": "Defib Kit Charging",
        "exportlocation": "",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Craft Empty Defib Kit": {
                "in_money": 10000,
                "aptitudes": {
                    "player.player": 0.1,
                    "trucking.trucking": 0.5
                },
                "products": {
                    "e_defibkit": 5
                },
                "onSelect": false,
                "reagents": {
                    "scrap_plastic": 10
                },
                "out_money": 0,
                "description": "Defib Kits",
                "onLeave": false,
                "onTransform": false,
                "cost": 1,
                "location": "Plastic Molding"
            }
        },
        "usage": {
            "Charge Empty Defib Kit": {
                "in_money": 5000,
                "aptitudes": {
                    "player.player": 0.1,
                    "trucking.trucking": 0.5
                },
                "products": {
                    "defibkit": 1
                },
                "onSelect": false,
                "reagents": {
                    "e_defibkit": 1
                },
                "out_money": 0,
                "description": "Charged Defib Kits",
                "onLeave": false,
                "onTransform": false,
                "cost": 1,
                "location": "Defib Kit Charging"
            }
        },
        "export": {},
        "key": "e_defibkit"
    },
    "Erasers": {
        "name": "Erasers",
        "jobs": {
            "trucker": true
        },
        "value": 600,
        "pickuplocation": "Cargo Seller: Erasers",
        "craftlocation": "",
        "usagelocation": "",
        "exportlocation": "Cargo Buyer: Erasers",
        "permissions": "",
        "pickup": {
            "Buy: Erasers": {
                "in_money": 200,
                "out_money": 0,
                "description": "Buy Erasers that can be sold at the Eraser Buyer<br/><em style='color:yellow'>Can only be stored in the Speedo Express and up to the MK4 trailer</em>",
                "aptitudes": [],
                "reagents": [],
                "products": {
                    "tcargosmall": 1
                },
                "location": "Cargo Seller: Erasers"
            },
            "Buy: Erasers x100": {
                "in_money": 20000,
                "out_money": 0,
                "description": "Buy Erasers in bulks of 100 that can be sold at the Eraser Buyer<br/><em style='color:yellow'>Can only be stored in the Speedo Express and up to the MK4 trailer</em>",
                "aptitudes": [],
                "reagents": [],
                "products": {
                    "tcargosmall": 100
                },
                "location": "Cargo Seller: Erasers"
            },
            "Buy: Erasers x10": {
                "in_money": 2000,
                "out_money": 0,
                "description": "Buy Erasers in bulks of 10 that can be sold at the Eraser Buyer<br/><em style='color:yellow'>Can only be stored in the Speedo Express and up to the MK4 trailer</em>",
                "aptitudes": [],
                "reagents": [],
                "products": {
                    "tcargosmall": 10
                },
                "location": "Cargo Seller: Erasers"
            }
        },
        "crafting": {},
        "usage": {},
        "export": {
            "Sell: Erasers x10": {
                "in_money": 0,
                "out_money": 6000,
                "description": "Sell your Erasers in bulks of 10",
                "aptitudes": {
                    "trucking.trucking": 4.0,
                    "physical.strength": 4.0,
                    "player.player": 4.0
                },
                "reagents": {
                    "tcargosmall": 10
                },
                "products": [],
                "location": "Cargo Buyer: Erasers"
            },
            "Sell: Erasers": {
                "in_money": 0,
                "out_money": 600,
                "description": "Sell your Erasers",
                "aptitudes": {
                    "trucking.trucking": 0.4,
                    "physical.strength": 0.4,
                    "player.player": 0.4
                },
                "reagents": {
                    "tcargosmall": 1
                },
                "products": [],
                "location": "Cargo Buyer: Erasers"
            },
            "Sell: Erasers x100": {
                "in_money": 0,
                "out_money": 60000,
                "description": "Sell your Erasers in bulks of 100",
                "aptitudes": {
                    "trucking.trucking": 40.0,
                    "physical.strength": 40.0,
                    "player.player": 40.0
                },
                "reagents": {
                    "tcargosmall": 100
                },
                "products": [],
                "location": "Cargo Buyer: Erasers"
            }
        },
        "key": "tcargosmall"
    },
    "Explosives": {
        "name": "Explosives",
        "jobs": {
            "military": true
        },
        "value": 0,
        "pickuplocation": "",
        "craftlocation": "Military Workshop",
        "usagelocation": "Deep Quarry",
        "exportlocation": "",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Create Explosives": {
                "reagents": {
                    "petrochem_sulfur": 10,
                    "petrochem_kerosene": 8
                },
                "out_money": 0,
                "in_money": 9500,
                "aptitudes": {
                    "trucking.trucking": 8.34,
                    "physical.strength": 8.34,
                    "player.player": 8.34
                },
                "description": "Create Explosives",
                "products": {
                    "military_explosives": 1
                },
                "location": "Military Workshop"
            }
        },
        "usage": {
            "Gravel Pulverizing": {
                "permissionsText": "Gravel Pulverizing Secret",
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 13.35,
                    "physical.strength": 13.35,
                    "player.player": 13.35
                },
                "products": {
                    "refined_sand": 100
                },
                "secret": true,
                "description": "Gravel Pulverizing",
                "reagents": {
                    "scrap_gravel": 20,
                    "military_explosives": 1
                },
                "permissions": [
                    "sd.trucking.quarry.gravel"
                ],
                "out_money": 0,
                "location": "Deep Quarry"
            },
            "Recycle Ore Mix": {
                "permissionsText": "Ore Mix Recycling Secret",
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 13.35,
                    "physical.strength": 13.35,
                    "player.player": 13.35
                },
                "products": {
                    "refined_sand": 90
                },
                "secret": true,
                "description": "Recycle Ore Mix",
                "reagents": {
                    "military_explosives": 1,
                    "scrap_ore": 15
                },
                "permissions": [
                    "sd.trucking.quarry.ore"
                ],
                "out_money": 0,
                "location": "Deep Quarry"
            },
            "Use Explosives": {
                "reagents": {
                    "military_explosives": 1
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 11.5,
                    "physical.strength": 11.5,
                    "player.player": 11.5
                },
                "description": "Use Explosives",
                "products": {
                    "military_titanium_ore": 4,
                    "scrap_gold": 10
                },
                "location": "GSD Mine"
            }
        },
        "export": {},
        "key": "military_explosives"
    },
    "Fiberglass": {
        "name": "Fiberglass",
        "jobs": {
            "trucker": true,
            "premium.trucking": true
        },
        "value": 60000,
        "pickuplocation": "",
        "craftlocation": "LS Factory",
        "usagelocation": "Vehicle Factory",
        "exportlocation": "Electronics Store",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Create Fiberglass Spool": {
                "reagents": {
                    "refined_planks": 1,
                    "scrap_plastic": 8,
                    "refined_glass": 4
                },
                "out_money": 0,
                "in_money": 5000,
                "aptitudes": {
                    "trucking.trucking": 1.81,
                    "physical.strength": 1.81,
                    "player.player": 1.81
                },
                "description": "Create spools of fiberglass",
                "products": {
                    "crafted_fiberglass": 2
                },
                "location": "LS Factory"
            },
            "Create Fiberglass Spool x10": {
                "reagents": {
                    "refined_planks": 10,
                    "scrap_plastic": 80,
                    "refined_glass": 40
                },
                "out_money": 0,
                "in_money": 50000,
                "aptitudes": {
                    "trucking.trucking": 18.1,
                    "physical.strength": 18.1,
                    "player.player": 18.1
                },
                "description": "Create spools of fiberglass",
                "products": {
                    "crafted_fiberglass": 20
                },
                "location": "LS Factory"
            }
        },
        "usage": {
            "HVY Nightshark": {
                "reagents": {
                    "liquid_water": 1,
                    "mechanicals_wheels": 4,
                    "crafted_fiberglass": 25,
                    "military_titanium": 60,
                    "mechanicals_vehicle_framework": 2,
                    "mechanicals_battery": 2,
                    "mechanicals_chassis": 2,
                    "crafted_circuit": 12,
                    "refined_glass": 15,
                    "refined_amalgam": 40,
                    "liberty_military_goods": 4
                },
                "description": "HVY Nightshark",
                "out_money": 0,
                "in_money": 13780000,
                "aptitudes": {
                    "trucking.trucking": 13.0,
                    "physical.strength": 13.0,
                    "player.player": 12.0
                },
                "products": {
                    "vehicle_shipment|nightshark|HVY Nightshark|car": 1
                },
                "location": "Vehicle Factory"
            },
            "Karin Futo": {
                "reagents": {
                    "mechanicals_chassis": 1,
                    "mechanicals_wheels": 4,
                    "crafted_fiberglass": 15,
                    "refined_amalgam": 50,
                    "crafted_circuit": 5,
                    "mechanicals_battery": 1,
                    "refined_glass": 25,
                    "mechanicals_vehicle_framework": 1
                },
                "description": "Karin Futo",
                "out_money": 0,
                "in_money": 220000,
                "aptitudes": {
                    "trucking.trucking": 13.0,
                    "physical.strength": 13.0,
                    "player.player": 12.0
                },
                "products": {
                    "vehicle_shipment|futo|Karin Futo|car": 1
                },
                "location": "Vehicle Factory"
            },
            "Coil Savanna": {
                "reagents": {
                    "mechanicals_battery": 1,
                    "crafted_fiberglass": 35,
                    "refined_amalgam": 50,
                    "crafted_circuit": 5,
                    "mechanicals_chassis": 1,
                    "refined_glass": 25,
                    "mechanicals_wheels": 4,
                    "mechanicals_battery_evb": 3,
                    "mechanicals_vehicle_framework": 1
                },
                "description": "Coil Savanna",
                "out_money": 0,
                "in_money": 8380000,
                "aptitudes": {
                    "trucking.trucking": 13.0,
                    "physical.strength": 13.0,
                    "player.player": 12.0
                },
                "products": {
                    "vehicle_shipment|savanna|Coil Savanna|car": 1
                },
                "location": "Vehicle Factory"
            },
            "Annis ZR-350": {
                "reagents": {
                    "mechanicals_chassis": 1,
                    "mechanicals_wheels": 4,
                    "crafted_fiberglass": 15,
                    "refined_amalgam": 50,
                    "crafted_circuit": 5,
                    "mechanicals_battery": 1,
                    "refined_glass": 25,
                    "mechanicals_vehicle_framework": 1
                },
                "description": "Annis ZR-350",
                "out_money": 0,
                "in_money": 1620000,
                "aptitudes": {
                    "trucking.trucking": 13.0,
                    "physical.strength": 13.0,
                    "player.player": 12.0
                },
                "products": {
                    "vehicle_shipment|zr350|Annis ZR-350|car": 1
                },
                "location": "Vehicle Factory"
            },
            "Hijak Vertice": {
                "reagents": {
                    "mechanicals_chassis": 1,
                    "mechanicals_wheels": 4,
                    "crafted_fiberglass": 15,
                    "refined_amalgam": 50,
                    "crafted_circuit": 5,
                    "mechanicals_battery": 1,
                    "refined_glass": 25,
                    "mechanicals_vehicle_framework": 1
                },
                "description": "Hijak Vertice",
                "out_money": 0,
                "in_money": 320000,
                "aptitudes": {
                    "trucking.trucking": 13.0,
                    "physical.strength": 13.0,
                    "player.player": 12.0
                },
                "products": {
                    "vehicle_shipment|vertice|Hijak Vertice|car": 1
                },
                "location": "Vehicle Factory"
            },
            "Coil Rocket Voltic": {
                "reagents": {
                    "mechanicals_wheels": 4,
                    "crafted_fiberglass": 15,
                    "petrochem_kerosene": 100,
                    "mechanicals_chassis": 1,
                    "refined_amalgam": 50,
                    "refined_glass": 25,
                    "mechanicals_battery": 1,
                    "crafted_circuit": 5,
                    "mechanicals_vehicle_framework": 1
                },
                "description": "Coil Rocket Voltic",
                "out_money": 0,
                "in_money": 90110000,
                "aptitudes": {
                    "trucking.trucking": 13.0,
                    "physical.strength": 13.0,
                    "player.player": 12.0
                },
                "products": {
                    "upgrade_kit_voltic2": 1
                },
                "location": "Vehicle Factory"
            },
            "Landstalker XL": {
                "permissionsText": "Landstalker XL Blueprints Secret",
                "in_money": 32000000,
                "aptitudes": {
                    "trucking.trucking": 130.0,
                    "physical.strength": 130.0,
                    "player.player": 120.0
                },
                "products": {
                    "vehicle_shipment|landstalker2|Landstalker XL|car": 1
                },
                "secret": true,
                "description": "Landstalker XL",
                "reagents": {
                    "mechanicals_chassis": 1,
                    "mechanicals_wheels": 4,
                    "crafted_fiberglass": 30,
                    "refined_amalgam": 100,
                    "crafted_circuit": 10,
                    "mechanicals_battery": 2,
                    "refined_glass": 50,
                    "mechanicals_vehicle_framework": 1
                },
                "permissions": [
                    "sd.trucking.shipment.landstalker2"
                ],
                "out_money": 0,
                "location": "Vehicle Factory"
            }
        },
        "export": {
            "Deliver Fiberglass Spool x10": {
                "reagents": {
                    "crafted_fiberglass": 10
                },
                "out_money": 600000,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 4.0,
                    "physical.strength": 4.0,
                    "player.player": 4.0
                },
                "description": "Deliver a shipment of fiberglass.",
                "products": [],
                "location": "Electronics Store"
            },
            "Deliver Fiberglass Spool": {
                "reagents": {
                    "crafted_fiberglass": 1
                },
                "out_money": 60000,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 0.4,
                    "physical.strength": 0.4,
                    "player.player": 0.4
                },
                "description": "Deliver a shipment of fiberglass.",
                "products": [],
                "location": "Electronics Store"
            }
        },
        "key": "crafted_fiberglass"
    },
    "Fish Meat": {
        "name": "Fish Meat",
        "jobs": {
            "fridge": true
        },
        "value": 0,
        "pickuplocation": "",
        "craftlocation": "",
        "usagelocation": "Clucking Bell Farms",
        "exportlocation": "",
        "permissions": "",
        "pickup": {},
        "crafting": {},
        "usage": {
            "Pack Fish Meat": {
                "reagents": {
                    "fish_meat": 150
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": [],
                "description": "Pack Fish Meat",
                "products": {
                    "fridge_meat": 1
                },
                "location": "Clucking Bell Farms"
            },
            "Pack Fish Meat x10": {
                "reagents": {
                    "fish_meat": 1500
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": [],
                "description": "Pack Fish Meat x10",
                "products": {
                    "fridge_meat": 10
                },
                "location": "Clucking Bell Farms"
            },
            "Pack Crispy Fish Meat x10": {
                "permissionsText": "Crispy Fish Secret",
                "in_money": 0,
                "aptitudes": [],
                "products": {
                    "fridge_meat": 10
                },
                "secret": true,
                "description": "Pack Crispy Fish Meat x10",
                "reagents": {
                    "fish_meat": 1000,
                    "tcargodust": 20
                },
                "permissions": [
                    "sd.trucking.clucking.fish"
                ],
                "out_money": 0,
                "location": "Clucking Bell Farms"
            }
        },
        "export": {},
        "key": "fish_meat"
    },
    "Flint": {
        "name": "Flint",
        "jobs": {
            "trucker": true
        },
        "value": 4250,
        "pickuplocation": "",
        "craftlocation": "Filtering Plant",
        "usagelocation": "LS Foundry",
        "exportlocation": "McKenzie Export",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Filter Gravel": {
                "reagents": {
                    "scrap_gravel": 10
                },
                "out_money": 0,
                "in_money": 15000,
                "aptitudes": {
                    "trucking.trucking": 0.24,
                    "physical.strength": 0.24,
                    "player.player": 0.24
                },
                "description": "Filter materials out of the gravel.",
                "products": {
                    "refined_flint": 4,
                    "refined_sand": 6
                },
                "location": "Filtering Plant"
            },
            "Filter Gravel x6": {
                "reagents": {
                    "scrap_gravel": 60
                },
                "out_money": 0,
                "in_money": 90000,
                "aptitudes": {
                    "trucking.trucking": 1.44,
                    "physical.strength": 1.44,
                    "player.player": 1.44
                },
                "description": "Filter materials out of the gravel.",
                "products": {
                    "refined_flint": 24,
                    "refined_sand": 36
                },
                "location": "Filtering Plant"
            }
        },
        "usage": {
            "Ceramic Tiles": {
                "reagents": {
                    "refined_flint": 10,
                    "refined_sand": 2
                },
                "out_money": 0,
                "in_money": 1000,
                "aptitudes": {
                    "trucking.trucking": 2.88,
                    "physical.strength": 2.88,
                    "player.player": 2.88
                },
                "description": "Make Ceramic Tiles",
                "products": {
                    "crafted_ceramictiles": 2
                },
                "location": "LS Foundry"
            },
            "Ceramic Tiles x10": {
                "reagents": {
                    "refined_flint": 100,
                    "refined_sand": 20
                },
                "out_money": 0,
                "in_money": 10000,
                "aptitudes": {
                    "trucking.trucking": 28.79999999999999,
                    "physical.strength": 28.79999999999999,
                    "player.player": 28.79999999999999
                },
                "description": "Make 10 Ceramic Tiles",
                "products": {
                    "crafted_ceramictiles": 20
                },
                "location": "LS Foundry"
            }
        },
        "export": {
            "Export Flint": {
                "reagents": {
                    "refined_flint": 1
                },
                "out_money": 4250,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 0.16,
                    "physical.strength": 0.16,
                    "player.player": 0.16
                },
                "description": "Export the flint",
                "products": [],
                "location": "McKenzie Export"
            },
            "Export Flint x10": {
                "reagents": {
                    "refined_flint": 10
                },
                "out_money": 42500,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 1.6,
                    "physical.strength": 1.6,
                    "player.player": 1.6
                },
                "description": "Export the flint",
                "products": [],
                "location": "McKenzie Export"
            },
            "Export Flint x100": {
                "reagents": {
                    "refined_flint": 100
                },
                "out_money": 425000,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 16.0,
                    "physical.strength": 16.0,
                    "player.player": 16.0
                },
                "description": "Export the flint",
                "products": [],
                "location": "McKenzie Export"
            }
        },
        "key": "refined_flint"
    },
    "Food Shipment": {
        "name": "Food Shipment",
        "jobs": {
            "fridge": true,
            "liberty": true
        },
        "value": 1200,
        "pickuplocation": "",
        "craftlocation": "Fridgit Co.",
        "usagelocation": "",
        "exportlocation": "Harmony Shopping Center",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Create Vegetables Shipment": {
                "reagents": {
                    "fridge_veggies": 4
                },
                "out_money": 0,
                "in_money": 2500,
                "aptitudes": {
                    "trucking.trucking": 3.74,
                    "physical.strength": 3.74,
                    "player.player": 3.74
                },
                "description": "Veggies to Food Shipment",
                "products": {
                    "fridge_store_delivery": 5
                },
                "location": "Fridgit Co."
            },
            "Create Meat Shipment": {
                "reagents": {
                    "fridge_meat": 4
                },
                "out_money": 0,
                "in_money": 2500,
                "aptitudes": {
                    "trucking.trucking": 2.33,
                    "physical.strength": 2.33,
                    "player.player": 2.33
                },
                "description": "Meat to Food Shipment",
                "products": {
                    "fridge_store_delivery": 5
                },
                "location": "Fridgit Co."
            },
            "Create Vegetables Shipment x10": {
                "reagents": {
                    "fridge_veggies": 40
                },
                "out_money": 0,
                "in_money": 25000,
                "aptitudes": {
                    "trucking.trucking": 37.4,
                    "physical.strength": 37.4,
                    "player.player": 37.4
                },
                "description": "Veggies to Food Shipment x10",
                "products": {
                    "fridge_store_delivery": 50
                },
                "location": "Fridgit Co."
            },
            "Create Dairy Shipment x10": {
                "reagents": {
                    "fridge_dairy": 40
                },
                "out_money": 0,
                "in_money": 25000,
                "aptitudes": {
                    "trucking.trucking": 32.59999999999999,
                    "physical.strength": 32.59999999999999,
                    "player.player": 32.59999999999999
                },
                "description": "Dairy to Food Shipment x10",
                "products": {
                    "fridge_store_delivery": 50
                },
                "location": "Fridgit Co."
            },
            "Create Dairy Shipment": {
                "reagents": {
                    "fridge_dairy": 4
                },
                "out_money": 0,
                "in_money": 2500,
                "aptitudes": {
                    "trucking.trucking": 3.26,
                    "physical.strength": 3.26,
                    "player.player": 3.26
                },
                "description": "Dairy to Food Shipment",
                "products": {
                    "fridge_store_delivery": 5
                },
                "location": "Fridgit Co."
            },
            "Create Meat Shipment x10": {
                "reagents": {
                    "fridge_meat": 40
                },
                "out_money": 0,
                "in_money": 25000,
                "aptitudes": {
                    "trucking.trucking": 23.3,
                    "physical.strength": 23.3,
                    "player.player": 23.3
                },
                "description": "Meat to Food Shipment x10",
                "products": {
                    "fridge_store_delivery": 50
                },
                "location": "Fridgit Co."
            },
            "Tokens to Fridge Store Delivery": {
                "reagents": {
                    "liberty_token": 1
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": [],
                "description": "Liberty Token -> Fridge Store Delivery",
                "products": {
                    "fridge_store_delivery": 1
                },
                "location": "The Undercover Storage Co."
            }
        },
        "usage": {},
        "export": {
            "Deliver Food Shipment x10": {
                "reagents": {
                    "fridge_store_delivery": 10
                },
                "out_money": 12000,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 3.8,
                    "physical.strength": 3.8,
                    "player.player": 3.8
                },
                "description": "Deliver Food Shipment",
                "products": [],
                "location": "Harmony Shopping Center"
            },
            "Deliver Food Shipment x30": {
                "reagents": {
                    "fridge_store_delivery": 30
                },
                "out_money": 36000,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 11.4,
                    "physical.strength": 11.4,
                    "player.player": 11.4
                },
                "description": "Deliver Food Shipment",
                "products": [],
                "location": "Harmony Shopping Center"
            },
            "Deliver Food Shipment": {
                "reagents": {
                    "fridge_store_delivery": 1
                },
                "out_money": 1200,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 0.38,
                    "physical.strength": 0.38,
                    "player.player": 0.38
                },
                "description": "Deliver Food Shipment",
                "products": [],
                "location": "Harmony Shopping Center"
            }
        },
        "key": "fridge_store_delivery"
    },
    "Frozen Raw Meat": {
        "name": "Frozen Raw Meat",
        "jobs": {
            "fridge": true
        },
        "value": 0,
        "pickuplocation": "",
        "craftlocation": "Clucking Bell Farms",
        "usagelocation": "Fridgit Co.",
        "exportlocation": "",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Pack Meat x10": {
                "reagents": {
                    "meat": 300
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": [],
                "description": "Pack Meat",
                "products": {
                    "fridge_meat": 10
                },
                "location": "Clucking Bell Farms"
            },
            "Pack Fish Meat": {
                "reagents": {
                    "fish_meat": 150
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": [],
                "description": "Pack Fish Meat",
                "products": {
                    "fridge_meat": 1
                },
                "location": "Clucking Bell Farms"
            },
            "Pack Fish Meat x10": {
                "reagents": {
                    "fish_meat": 1500
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": [],
                "description": "Pack Fish Meat x10",
                "products": {
                    "fridge_meat": 10
                },
                "location": "Clucking Bell Farms"
            },
            "Pack Crispy Meat x10": {
                "permissionsText": "Crispy Meat Secret",
                "in_money": 0,
                "aptitudes": [],
                "products": {
                    "fridge_meat": 10
                },
                "secret": true,
                "description": "Pack Crispy Meat x10",
                "reagents": {
                    "meat": 200,
                    "tcargodust": 20
                },
                "permissions": [
                    "sd.trucking.clucking.meat"
                ],
                "out_money": 0,
                "location": "Clucking Bell Farms"
            },
            "Pack Crispy Fish Meat x10": {
                "permissionsText": "Crispy Fish Secret",
                "in_money": 0,
                "aptitudes": [],
                "products": {
                    "fridge_meat": 10
                },
                "secret": true,
                "description": "Pack Crispy Fish Meat x10",
                "reagents": {
                    "fish_meat": 1000,
                    "tcargodust": 20
                },
                "permissions": [
                    "sd.trucking.clucking.fish"
                ],
                "out_money": 0,
                "location": "Clucking Bell Farms"
            },
            "Pack Meat": {
                "reagents": {
                    "meat": 30
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": [],
                "description": "Pack Meat",
                "products": {
                    "fridge_meat": 1
                },
                "location": "Clucking Bell Farms"
            }
        },
        "usage": {
            "Create Airline Meal x10": {
                "reagents": {
                    "fridge_veggies": 10,
                    "fridge_meat": 10,
                    "fridge_dairy": 10
                },
                "out_money": 0,
                "in_money": 25000,
                "aptitudes": {
                    "trucking.trucking": 52.4,
                    "physical.strength": 52.4,
                    "player.player": 52.4
                },
                "description": "Create Airline Meal x10",
                "products": {
                    "fridge_airline_meal": 40
                },
                "location": "Fridgit Co."
            },
            "Create Meat Shipment": {
                "reagents": {
                    "fridge_meat": 4
                },
                "out_money": 0,
                "in_money": 2500,
                "aptitudes": {
                    "trucking.trucking": 2.33,
                    "physical.strength": 2.33,
                    "player.player": 2.33
                },
                "description": "Meat to Food Shipment",
                "products": {
                    "fridge_store_delivery": 5
                },
                "location": "Fridgit Co."
            },
            "Create Airline Meal": {
                "reagents": {
                    "fridge_veggies": 1,
                    "fridge_meat": 1,
                    "fridge_dairy": 1
                },
                "out_money": 0,
                "in_money": 2500,
                "aptitudes": {
                    "trucking.trucking": 5.24,
                    "physical.strength": 5.24,
                    "player.player": 5.24
                },
                "description": "Create Airline Meal",
                "products": {
                    "fridge_airline_meal": 4
                },
                "location": "Fridgit Co."
            },
            "Create Meat Shipment x10": {
                "reagents": {
                    "fridge_meat": 40
                },
                "out_money": 0,
                "in_money": 25000,
                "aptitudes": {
                    "trucking.trucking": 23.3,
                    "physical.strength": 23.3,
                    "player.player": 23.3
                },
                "description": "Meat to Food Shipment x10",
                "products": {
                    "fridge_store_delivery": 50
                },
                "location": "Fridgit Co."
            }
        },
        "export": {},
        "key": "fridge_meat"
    },
    "Full Box Capsules": {
        "name": "Full Box Capsules",
        "jobs": {
            "trucker": true
        },
        "value": 0,
        "pickuplocation": "",
        "craftlocation": "Liquor Ace",
        "usagelocation": "",
        "exportlocation": "",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Fill empty pill box": {
                "in_money": 5000,
                "aptitudes": [],
                "products": {
                    "full_box_capsules": 1
                },
                "onSelect": false,
                "reagents": {
                    "empty_box_capsules": 1
                },
                "out_money": 0,
                "description": "Methamphetamine",
                "onLeave": false,
                "onTransform": false,
                "cost": 1,
                "location": "Liquor Ace"
            }
        },
        "usage": {},
        "export": {},
        "key": "full_box_capsules"
    },
    "Glass": {
        "name": "Glass",
        "jobs": {
            "trucker": true,
            "premium.trucking": true
        },
        "value": 10000,
        "pickuplocation": "",
        "craftlocation": "LS Foundry",
        "usagelocation": "Vehicle Factory",
        "exportlocation": "LS Port Export",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Refine Glass x10": {
                "reagents": {
                    "refined_sand": 10
                },
                "out_money": 0,
                "in_money": 10000,
                "aptitudes": {
                    "trucking.trucking": 2.9,
                    "physical.strength": 2.9,
                    "player.player": 2.9
                },
                "description": "Create glass out of that rich sand",
                "products": {
                    "refined_glass": 10
                },
                "location": "LS Foundry"
            },
            "Refine Glass x1": {
                "reagents": {
                    "refined_sand": 1
                },
                "out_money": 0,
                "in_money": 1000,
                "aptitudes": {
                    "trucking.trucking": 0.29,
                    "physical.strength": 0.29,
                    "player.player": 0.29
                },
                "description": "Create glass out of that rich sand",
                "products": {
                    "refined_glass": 1
                },
                "location": "LS Foundry"
            }
        },
        "usage": {
            "HVY Nightshark": {
                "reagents": {
                    "liquid_water": 1,
                    "mechanicals_wheels": 4,
                    "crafted_fiberglass": 25,
                    "military_titanium": 60,
                    "mechanicals_vehicle_framework": 2,
                    "mechanicals_battery": 2,
                    "mechanicals_chassis": 2,
                    "crafted_circuit": 12,
                    "refined_glass": 15,
                    "refined_amalgam": 40,
                    "liberty_military_goods": 4
                },
                "description": "HVY Nightshark",
                "out_money": 0,
                "in_money": 13780000,
                "aptitudes": {
                    "trucking.trucking": 13.0,
                    "physical.strength": 13.0,
                    "player.player": 12.0
                },
                "products": {
                    "vehicle_shipment|nightshark|HVY Nightshark|car": 1
                },
                "location": "Vehicle Factory"
            },
            "Karin Futo": {
                "reagents": {
                    "mechanicals_chassis": 1,
                    "mechanicals_wheels": 4,
                    "crafted_fiberglass": 15,
                    "refined_amalgam": 50,
                    "crafted_circuit": 5,
                    "mechanicals_battery": 1,
                    "refined_glass": 25,
                    "mechanicals_vehicle_framework": 1
                },
                "description": "Karin Futo",
                "out_money": 0,
                "in_money": 220000,
                "aptitudes": {
                    "trucking.trucking": 13.0,
                    "physical.strength": 13.0,
                    "player.player": 12.0
                },
                "products": {
                    "vehicle_shipment|futo|Karin Futo|car": 1
                },
                "location": "Vehicle Factory"
            },
            "Coil Savanna": {
                "reagents": {
                    "mechanicals_battery": 1,
                    "crafted_fiberglass": 35,
                    "refined_amalgam": 50,
                    "crafted_circuit": 5,
                    "mechanicals_chassis": 1,
                    "refined_glass": 25,
                    "mechanicals_wheels": 4,
                    "mechanicals_battery_evb": 3,
                    "mechanicals_vehicle_framework": 1
                },
                "description": "Coil Savanna",
                "out_money": 0,
                "in_money": 8380000,
                "aptitudes": {
                    "trucking.trucking": 13.0,
                    "physical.strength": 13.0,
                    "player.player": 12.0
                },
                "products": {
                    "vehicle_shipment|savanna|Coil Savanna|car": 1
                },
                "location": "Vehicle Factory"
            },
            "Annis ZR-350": {
                "reagents": {
                    "mechanicals_chassis": 1,
                    "mechanicals_wheels": 4,
                    "crafted_fiberglass": 15,
                    "refined_amalgam": 50,
                    "crafted_circuit": 5,
                    "mechanicals_battery": 1,
                    "refined_glass": 25,
                    "mechanicals_vehicle_framework": 1
                },
                "description": "Annis ZR-350",
                "out_money": 0,
                "in_money": 1620000,
                "aptitudes": {
                    "trucking.trucking": 13.0,
                    "physical.strength": 13.0,
                    "player.player": 12.0
                },
                "products": {
                    "vehicle_shipment|zr350|Annis ZR-350|car": 1
                },
                "location": "Vehicle Factory"
            },
            "Hijak Vertice": {
                "reagents": {
                    "mechanicals_chassis": 1,
                    "mechanicals_wheels": 4,
                    "crafted_fiberglass": 15,
                    "refined_amalgam": 50,
                    "crafted_circuit": 5,
                    "mechanicals_battery": 1,
                    "refined_glass": 25,
                    "mechanicals_vehicle_framework": 1
                },
                "description": "Hijak Vertice",
                "out_money": 0,
                "in_money": 320000,
                "aptitudes": {
                    "trucking.trucking": 13.0,
                    "physical.strength": 13.0,
                    "player.player": 12.0
                },
                "products": {
                    "vehicle_shipment|vertice|Hijak Vertice|car": 1
                },
                "location": "Vehicle Factory"
            },
            "Coil Rocket Voltic": {
                "reagents": {
                    "mechanicals_wheels": 4,
                    "crafted_fiberglass": 15,
                    "petrochem_kerosene": 100,
                    "mechanicals_chassis": 1,
                    "refined_amalgam": 50,
                    "refined_glass": 25,
                    "mechanicals_battery": 1,
                    "crafted_circuit": 5,
                    "mechanicals_vehicle_framework": 1
                },
                "description": "Coil Rocket Voltic",
                "out_money": 0,
                "in_money": 90110000,
                "aptitudes": {
                    "trucking.trucking": 13.0,
                    "physical.strength": 13.0,
                    "player.player": 12.0
                },
                "products": {
                    "upgrade_kit_voltic2": 1
                },
                "location": "Vehicle Factory"
            },
            "Landstalker XL": {
                "permissionsText": "Landstalker XL Blueprints Secret",
                "in_money": 32000000,
                "aptitudes": {
                    "trucking.trucking": 130.0,
                    "physical.strength": 130.0,
                    "player.player": 120.0
                },
                "products": {
                    "vehicle_shipment|landstalker2|Landstalker XL|car": 1
                },
                "secret": true,
                "description": "Landstalker XL",
                "reagents": {
                    "mechanicals_chassis": 1,
                    "mechanicals_wheels": 4,
                    "crafted_fiberglass": 30,
                    "refined_amalgam": 100,
                    "crafted_circuit": 10,
                    "mechanicals_battery": 2,
                    "refined_glass": 50,
                    "mechanicals_vehicle_framework": 1
                },
                "permissions": [
                    "sd.trucking.shipment.landstalker2"
                ],
                "out_money": 0,
                "location": "Vehicle Factory"
            },
            "Create Fiberglass Spool": {
                "reagents": {
                    "refined_planks": 1,
                    "scrap_plastic": 8,
                    "refined_glass": 4
                },
                "out_money": 0,
                "in_money": 5000,
                "aptitudes": {
                    "trucking.trucking": 1.81,
                    "physical.strength": 1.81,
                    "player.player": 1.81
                },
                "description": "Create spools of fiberglass",
                "products": {
                    "crafted_fiberglass": 2
                },
                "location": "LS Factory"
            },
            "Create Fiberglass Spool x10": {
                "reagents": {
                    "refined_planks": 10,
                    "scrap_plastic": 80,
                    "refined_glass": 40
                },
                "out_money": 0,
                "in_money": 50000,
                "aptitudes": {
                    "trucking.trucking": 18.1,
                    "physical.strength": 18.1,
                    "player.player": 18.1
                },
                "description": "Create spools of fiberglass",
                "products": {
                    "crafted_fiberglass": 20
                },
                "location": "LS Factory"
            }
        },
        "export": {
            "Export Refined Glass x1": {
                "reagents": {
                    "refined_glass": 1
                },
                "out_money": 10000,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 0.17,
                    "physical.strength": 0.17,
                    "player.player": 0.17
                },
                "description": "Export glass",
                "products": [],
                "location": "LS Port Export"
            },
            "Export Refined Glass x10": {
                "reagents": {
                    "refined_glass": 10
                },
                "out_money": 100000,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 1.7,
                    "physical.strength": 1.7,
                    "player.player": 1.7
                },
                "description": "Export glass in bulks of 10",
                "products": [],
                "location": "LS Port Export"
            }
        },
        "key": "refined_glass"
    },
    "Gravel": {
        "name": "Gravel",
        "jobs": {
            "military": true,
            "trucker": true,
            "petrochem": true
        },
        "value": 0,
        "pickuplocation": "",
        "craftlocation": "Deep Quarry",
        "usagelocation": "Deep Quarry",
        "exportlocation": "",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Use Explosives": {
                "reagents": {
                    "military_explosives": 1
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 13.35,
                    "physical.strength": 13.35,
                    "player.player": 13.35
                },
                "description": "Use Explosives",
                "products": {
                    "scrap_gravel": 30,
                    "refined_sand": 20
                },
                "location": "Deep Quarry"
            },
            "Filter Quarry Rubble": {
                "reagents": {
                    "recycled_rubble": 1
                },
                "out_money": 0,
                "in_money": 15000,
                "aptitudes": {
                    "trucking.trucking": 2.45,
                    "physical.strength": 2.45,
                    "player.player": 2.45
                },
                "description": "Filter materials out of the rubble.",
                "products": {
                    "scrap_ore": 4,
                    "scrap_gravel": 12,
                    "scrap_emerald": 1
                },
                "location": "Filtering Plant"
            },
            "Filter Quarry Rubble x2": {
                "reagents": {
                    "recycled_rubble": 2
                },
                "out_money": 0,
                "in_money": 30000,
                "aptitudes": {
                    "trucking.trucking": 4.9,
                    "physical.strength": 4.9,
                    "player.player": 4.9
                },
                "description": "Filter materials out of the rubble.",
                "products": {
                    "scrap_ore": 8,
                    "scrap_gravel": 24,
                    "scrap_emerald": 2
                },
                "location": "Filtering Plant"
            }
        },
        "usage": {
            "Gravel Pulverizing": {
                "permissionsText": "Gravel Pulverizing Secret",
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 13.35,
                    "physical.strength": 13.35,
                    "player.player": 13.35
                },
                "products": {
                    "refined_sand": 100
                },
                "secret": true,
                "description": "Gravel Pulverizing",
                "reagents": {
                    "scrap_gravel": 20,
                    "military_explosives": 1
                },
                "permissions": [
                    "sd.trucking.quarry.gravel"
                ],
                "out_money": 0,
                "location": "Deep Quarry"
            },
            "Filter Gravel": {
                "reagents": {
                    "scrap_gravel": 10
                },
                "out_money": 0,
                "in_money": 15000,
                "aptitudes": {
                    "trucking.trucking": 0.24,
                    "physical.strength": 0.24,
                    "player.player": 0.24
                },
                "description": "Filter materials out of the gravel.",
                "products": {
                    "refined_flint": 4,
                    "refined_sand": 6
                },
                "location": "Filtering Plant"
            },
            "Filter Gravel x6": {
                "reagents": {
                    "scrap_gravel": 60
                },
                "out_money": 0,
                "in_money": 90000,
                "aptitudes": {
                    "trucking.trucking": 1.44,
                    "physical.strength": 1.44,
                    "player.player": 1.44
                },
                "description": "Filter materials out of the gravel.",
                "products": {
                    "refined_flint": 24,
                    "refined_sand": 36
                },
                "location": "Filtering Plant"
            },
            "Create Asphalt": {
                "permissionsText": "Asphalt Concrete Refining Secret",
                "in_money": 10250,
                "aptitudes": {
                    "trucking.trucking": 8.81,
                    "physical.strength": 8.81,
                    "player.player": 8.81
                },
                "products": {
                    "petrochem_asphalt": 20
                },
                "secret": true,
                "description": "Create Asphalt",
                "reagents": {
                    "petrochem_oil": 1,
                    "scrap_gravel": 20
                },
                "permissions": [
                    "sd.trucking.asphalt"
                ],
                "out_money": 0,
                "location": "Refinery"
            }
        },
        "export": {},
        "key": "scrap_gravel"
    },
    "Helicopter Fuel": {
        "name": "Helicopter Fuel",
        "jobs": {
            "petrochem": true
        },
        "value": 0,
        "pickuplocation": "",
        "craftlocation": "Oil Depository",
        "usagelocation": "",
        "exportlocation": "",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Fill Helicoper Cans": {
                "reagents": {
                    "petrochem_kerosene": 1
                },
                "out_money": 11000,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 1.9,
                    "physical.strength": 1.9,
                    "player.player": 1.9
                },
                "description": "Fill Helicoper Cans",
                "products": {
                    "jerry_can|HELICOPTER|Helicopter": 10
                },
                "location": "Oil Depository"
            }
        },
        "usage": {},
        "export": {},
        "key": "jerry_can|HELICOPTER|Helicopter"
    },
    "Hide Bear": {
        "name": "Hide Bear",
        "jobs": {
            "trucker": true
        },
        "value": 0,
        "pickuplocation": "",
        "craftlocation": "",
        "usagelocation": "Raven Slaughterhouse",
        "exportlocation": "",
        "permissions": "",
        "pickup": {},
        "crafting": {},
        "usage": {
            "Brown Bear x1": {
                "in_money": 2000,
                "aptitudes": {
                    "hunting.skill": 6.0
                },
                "products": {
                    "meat": 40
                },
                "onSelect": false,
                "reagents": {
                    "hide_bear": 1
                },
                "out_money": 0,
                "description": "Brown Bear x1",
                "onLeave": false,
                "onTransform": false,
                "cost": 1,
                "location": "Raven Slaughterhouse"
            },
            "Brown Bear x10": {
                "in_money": 20000,
                "aptitudes": {
                    "hunting.skill": 60.0
                },
                "products": {
                    "meat": 400
                },
                "onSelect": false,
                "reagents": {
                    "hide_bear": 10
                },
                "out_money": 0,
                "description": "Brown Bear x10",
                "onLeave": false,
                "onTransform": false,
                "cost": 10,
                "location": "Raven Slaughterhouse"
            }
        },
        "export": {},
        "key": "hide_bear"
    },
    "Hide Boar": {
        "name": "Hide Boar",
        "jobs": {
            "trucker": true
        },
        "value": 0,
        "pickuplocation": "",
        "craftlocation": "",
        "usagelocation": "Raven Slaughterhouse",
        "exportlocation": "",
        "permissions": "",
        "pickup": {},
        "crafting": {},
        "usage": {
            "Boar x10": {
                "in_money": 20000,
                "aptitudes": {
                    "hunting.skill": 30.0
                },
                "products": {
                    "meat": 200
                },
                "onSelect": false,
                "reagents": {
                    "hide_boar": 10
                },
                "out_money": 0,
                "description": "Boar x10",
                "onLeave": false,
                "onTransform": false,
                "cost": 10,
                "location": "Raven Slaughterhouse"
            },
            "Boar x1": {
                "in_money": 2000,
                "aptitudes": {
                    "hunting.skill": 3.0
                },
                "products": {
                    "meat": 20
                },
                "onSelect": false,
                "reagents": {
                    "hide_boar": 1
                },
                "out_money": 0,
                "description": "Boar x1",
                "onLeave": false,
                "onTransform": false,
                "cost": 1,
                "location": "Raven Slaughterhouse"
            }
        },
        "export": {},
        "key": "hide_boar"
    },
    "Hide Coyote": {
        "name": "Hide Coyote",
        "jobs": {
            "trucker": true
        },
        "value": 0,
        "pickuplocation": "",
        "craftlocation": "",
        "usagelocation": "Raven Slaughterhouse",
        "exportlocation": "",
        "permissions": "",
        "pickup": {},
        "crafting": {},
        "usage": {
            "Coyote x1": {
                "in_money": 2000,
                "aptitudes": {
                    "hunting.skill": 0.89999999999999
                },
                "products": {
                    "meat": 6
                },
                "onSelect": false,
                "reagents": {
                    "hide_coyote": 1
                },
                "out_money": 0,
                "description": "Coyote x1",
                "onLeave": false,
                "onTransform": false,
                "cost": 1,
                "location": "Raven Slaughterhouse"
            },
            "Coyote x10": {
                "in_money": 20000,
                "aptitudes": {
                    "hunting.skill": 9.0
                },
                "products": {
                    "meat": 60
                },
                "onSelect": false,
                "reagents": {
                    "hide_coyote": 10
                },
                "out_money": 0,
                "description": "Coyote x10",
                "onLeave": false,
                "onTransform": false,
                "cost": 10,
                "location": "Raven Slaughterhouse"
            }
        },
        "export": {},
        "key": "hide_coyote"
    },
    "Hide Deer": {
        "name": "Hide Deer",
        "jobs": {
            "trucker": true
        },
        "value": 0,
        "pickuplocation": "",
        "craftlocation": "",
        "usagelocation": "Raven Slaughterhouse",
        "exportlocation": "",
        "permissions": "",
        "pickup": {},
        "crafting": {},
        "usage": {
            "Deer x1": {
                "in_money": 2000,
                "aptitudes": {
                    "hunting.skill": 1.79999999999999
                },
                "products": {
                    "meat": 12
                },
                "onSelect": false,
                "reagents": {
                    "hide_deer": 1
                },
                "out_money": 0,
                "description": "Deer x1",
                "onLeave": false,
                "onTransform": false,
                "cost": 1,
                "location": "Raven Slaughterhouse"
            },
            "Deer x10": {
                "in_money": 20000,
                "aptitudes": {
                    "hunting.skill": 18.0
                },
                "products": {
                    "meat": 120
                },
                "onSelect": false,
                "reagents": {
                    "hide_deer": 10
                },
                "out_money": 0,
                "description": "Deer x10",
                "onLeave": false,
                "onTransform": false,
                "cost": 10,
                "location": "Raven Slaughterhouse"
            }
        },
        "export": {},
        "key": "hide_deer"
    },
    "Hide Leopard": {
        "name": "Hide Leopard",
        "jobs": {
            "trucker": true
        },
        "value": 0,
        "pickuplocation": "",
        "craftlocation": "",
        "usagelocation": "Raven Slaughterhouse",
        "exportlocation": "",
        "permissions": "",
        "pickup": {},
        "crafting": {},
        "usage": {
            "Leopard x10": {
                "in_money": 20000,
                "aptitudes": {
                    "hunting.skill": 30.0
                },
                "products": {
                    "meat": 200
                },
                "onSelect": false,
                "reagents": {
                    "hide_leopard": 10
                },
                "out_money": 0,
                "description": "Leopard x10",
                "onLeave": false,
                "onTransform": false,
                "cost": 10,
                "location": "Raven Slaughterhouse"
            },
            "Leopard x1": {
                "in_money": 2000,
                "aptitudes": {
                    "hunting.skill": 3.0
                },
                "products": {
                    "meat": 20
                },
                "onSelect": false,
                "reagents": {
                    "hide_leopard": 1
                },
                "out_money": 0,
                "description": "Leopard x1",
                "onLeave": false,
                "onTransform": false,
                "cost": 1,
                "location": "Raven Slaughterhouse"
            }
        },
        "export": {},
        "key": "hide_leopard"
    },
    "Hide Lion": {
        "name": "Hide Lion",
        "jobs": {
            "trucker": true
        },
        "value": 0,
        "pickuplocation": "",
        "craftlocation": "",
        "usagelocation": "Raven Slaughterhouse",
        "exportlocation": "",
        "permissions": "",
        "pickup": {},
        "crafting": {},
        "usage": {
            "Lion x10": {
                "in_money": 20000,
                "aptitudes": {
                    "hunting.skill": 30.0
                },
                "products": {
                    "meat": 200
                },
                "onSelect": false,
                "reagents": {
                    "hide_lion": 10
                },
                "out_money": 0,
                "description": "Lion x10",
                "onLeave": false,
                "onTransform": false,
                "cost": 10,
                "location": "Raven Slaughterhouse"
            },
            "Lion x1": {
                "in_money": 2000,
                "aptitudes": {
                    "hunting.skill": 3.0
                },
                "products": {
                    "meat": 20
                },
                "onSelect": false,
                "reagents": {
                    "hide_lion": 1
                },
                "out_money": 0,
                "description": "Lion x1",
                "onLeave": false,
                "onTransform": false,
                "cost": 1,
                "location": "Raven Slaughterhouse"
            }
        },
        "export": {},
        "key": "hide_lion"
    },
    "Hide Mtlion": {
        "name": "Hide Mtlion",
        "jobs": {
            "trucker": true
        },
        "value": 0,
        "pickuplocation": "",
        "craftlocation": "",
        "usagelocation": "Raven Slaughterhouse",
        "exportlocation": "",
        "permissions": "",
        "pickup": {},
        "crafting": {},
        "usage": {
            "Cougar x10": {
                "in_money": 20000,
                "aptitudes": {
                    "hunting.skill": 15.0
                },
                "products": {
                    "meat": 100
                },
                "onSelect": false,
                "reagents": {
                    "hide_mtlion": 10
                },
                "out_money": 0,
                "description": "Cougar x10",
                "onLeave": false,
                "onTransform": false,
                "cost": 10,
                "location": "Raven Slaughterhouse"
            },
            "Cougar x1": {
                "in_money": 2000,
                "aptitudes": {
                    "hunting.skill": 1.5
                },
                "products": {
                    "meat": 10
                },
                "onSelect": false,
                "reagents": {
                    "hide_mtlion": 1
                },
                "out_money": 0,
                "description": "Cougar x1",
                "onLeave": false,
                "onTransform": false,
                "cost": 1,
                "location": "Raven Slaughterhouse"
            }
        },
        "export": {},
        "key": "hide_mtlion"
    },
    "Hide Rabbit": {
        "name": "Hide Rabbit",
        "jobs": {
            "trucker": true
        },
        "value": 0,
        "pickuplocation": "",
        "craftlocation": "",
        "usagelocation": "Raven Slaughterhouse",
        "exportlocation": "",
        "permissions": "",
        "pickup": {},
        "crafting": {},
        "usage": {
            "Rabbit x10": {
                "in_money": 20000,
                "aptitudes": {
                    "hunting.skill": 3.0
                },
                "products": {
                    "meat": 20
                },
                "onSelect": false,
                "reagents": {
                    "hide_rabbit": 10
                },
                "out_money": 0,
                "description": "Rabbit x10",
                "onLeave": false,
                "onTransform": false,
                "cost": 10,
                "location": "Raven Slaughterhouse"
            },
            "Rabbit x1": {
                "in_money": 2000,
                "aptitudes": {
                    "hunting.skill": 0.3
                },
                "products": {
                    "meat": 2
                },
                "onSelect": false,
                "reagents": {
                    "hide_rabbit": 1
                },
                "out_money": 0,
                "description": "Rabbit x1",
                "onLeave": false,
                "onTransform": false,
                "cost": 1,
                "location": "Raven Slaughterhouse"
            }
        },
        "export": {},
        "key": "hide_rabbit"
    },
    "Hide Rat": {
        "name": "Hide Rat",
        "jobs": {
            "trucker": true
        },
        "value": 0,
        "pickuplocation": "",
        "craftlocation": "",
        "usagelocation": "Raven Slaughterhouse",
        "exportlocation": "",
        "permissions": "",
        "pickup": {},
        "crafting": {},
        "usage": {
            "Rat x1": {
                "in_money": 2000,
                "aptitudes": {
                    "hunting.skill": 0.15
                },
                "products": {
                    "meat": 1
                },
                "onSelect": false,
                "reagents": {
                    "hide_rat": 1
                },
                "out_money": 0,
                "description": "Rat x1",
                "onLeave": false,
                "onTransform": false,
                "cost": 1,
                "location": "Raven Slaughterhouse"
            },
            "Rat x10": {
                "in_money": 20000,
                "aptitudes": {
                    "hunting.skill": 1.5
                },
                "products": {
                    "meat": 10
                },
                "onSelect": false,
                "reagents": {
                    "hide_rat": 10
                },
                "out_money": 0,
                "description": "Rat x10",
                "onLeave": false,
                "onTransform": false,
                "cost": 10,
                "location": "Raven Slaughterhouse"
            }
        },
        "export": {},
        "key": "hide_rat"
    },
    "Hide Wolf": {
        "name": "Hide Wolf",
        "jobs": {
            "trucker": true
        },
        "value": 0,
        "pickuplocation": "",
        "craftlocation": "",
        "usagelocation": "Raven Slaughterhouse",
        "exportlocation": "",
        "permissions": "",
        "pickup": {},
        "crafting": {},
        "usage": {
            "Wolf x10": {
                "in_money": 20000,
                "aptitudes": {
                    "hunting.skill": 30.0
                },
                "products": {
                    "meat": 200
                },
                "onSelect": false,
                "reagents": {
                    "hide_wolf": 10
                },
                "out_money": 0,
                "description": "Wolf x10",
                "onLeave": false,
                "onTransform": false,
                "cost": 10,
                "location": "Raven Slaughterhouse"
            },
            "Wolf x1": {
                "in_money": 2000,
                "aptitudes": {
                    "hunting.skill": 3.0
                },
                "products": {
                    "meat": 20
                },
                "onSelect": false,
                "reagents": {
                    "hide_wolf": 1
                },
                "out_money": 0,
                "description": "Wolf x1",
                "onLeave": false,
                "onTransform": false,
                "cost": 1,
                "location": "Raven Slaughterhouse"
            }
        },
        "export": {},
        "key": "hide_wolf"
    },
    "Hijak Vertice": {
        "name": "Hijak Vertice",
        "jobs": {
            "premium.trucking": true
        },
        "value": 0,
        "pickuplocation": "",
        "craftlocation": "Vehicle Factory",
        "usagelocation": "",
        "exportlocation": "",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Hijak Vertice": {
                "reagents": {
                    "mechanicals_chassis": 1,
                    "mechanicals_wheels": 4,
                    "crafted_fiberglass": 15,
                    "refined_amalgam": 50,
                    "crafted_circuit": 5,
                    "mechanicals_battery": 1,
                    "refined_glass": 25,
                    "mechanicals_vehicle_framework": 1
                },
                "description": "Hijak Vertice",
                "out_money": 0,
                "in_money": 320000,
                "aptitudes": {
                    "trucking.trucking": 13.0,
                    "physical.strength": 13.0,
                    "player.player": 12.0
                },
                "products": {
                    "vehicle_shipment|vertice|Hijak Vertice|car": 1
                },
                "location": "Vehicle Factory"
            }
        },
        "usage": {},
        "export": {},
        "key": "vehicle_shipment|vertice|Hijak Vertice|car"
    },
    "Hvy Nightshark": {
        "name": "Hvy Nightshark",
        "jobs": {
            "premium.trucking": true
        },
        "value": 0,
        "pickuplocation": "",
        "craftlocation": "Vehicle Factory",
        "usagelocation": "",
        "exportlocation": "",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "HVY Nightshark": {
                "reagents": {
                    "liquid_water": 1,
                    "mechanicals_wheels": 4,
                    "crafted_fiberglass": 25,
                    "military_titanium": 60,
                    "mechanicals_vehicle_framework": 2,
                    "mechanicals_battery": 2,
                    "mechanicals_chassis": 2,
                    "crafted_circuit": 12,
                    "refined_glass": 15,
                    "refined_amalgam": 40,
                    "liberty_military_goods": 4
                },
                "description": "HVY Nightshark",
                "out_money": 0,
                "in_money": 13780000,
                "aptitudes": {
                    "trucking.trucking": 13.0,
                    "physical.strength": 13.0,
                    "player.player": 12.0
                },
                "products": {
                    "vehicle_shipment|nightshark|HVY Nightshark|car": 1
                },
                "location": "Vehicle Factory"
            }
        },
        "usage": {},
        "export": {},
        "key": "vehicle_shipment|nightshark|HVY Nightshark|car"
    },
    "Jerry Can Empty": {
        "name": "Jerry Can Empty",
        "jobs": {
            "petrochem": true
        },
        "value": 400,
        "pickuplocation": "",
        "craftlocation": "",
        "usagelocation": "",
        "exportlocation": "Bristols Fuel Storage",
        "permissions": "",
        "pickup": {},
        "crafting": {},
        "usage": {},
        "export": {
            "Sell Empty Jerry Cans": {
                "reagents": {
                    "jerry_can_empty": 10
                },
                "out_money": 4000,
                "in_money": 0,
                "aptitudes": [],
                "description": "Sell Empty Jerry Cans",
                "products": [],
                "location": "Bristols Fuel Storage"
            }
        },
        "key": "jerry_can_empty"
    },
    "Jewelry": {
        "name": "Jewelry",
        "jobs": {
            "trucker": true
        },
        "value": 95000,
        "pickuplocation": "",
        "craftlocation": "LS Factory",
        "usagelocation": "",
        "exportlocation": "Jewelry Store",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Create Jewelry": {
                "reagents": {
                    "scrap_emerald": 1,
                    "refined_gold": 2
                },
                "out_money": 0,
                "in_money": 5000,
                "aptitudes": {
                    "trucking.trucking": 2.8,
                    "physical.strength": 2.8,
                    "player.player": 2.8
                },
                "description": "Combine valuable items into even more valuable jewelry.",
                "products": {
                    "crafted_jewelry": 2
                },
                "location": "LS Factory"
            },
            "Titanium Jewelry": {
                "permissionsText": "Titanium Jewelry Secret",
                "in_money": 5000,
                "aptitudes": {
                    "trucking.trucking": 4.79,
                    "physical.strength": 4.79,
                    "player.player": 4.79
                },
                "products": {
                    "crafted_jewelry": 4
                },
                "secret": true,
                "description": "Combine valuable items into even more valuable jewelry.",
                "reagents": {
                    "military_titanium": 1,
                    "refined_gold": 4
                },
                "permissions": [
                    "sd.trucking.factory.jewelry"
                ],
                "out_money": 0,
                "location": "LS Factory"
            }
        },
        "usage": {},
        "export": {
            "Deliver Jewelry": {
                "reagents": {
                    "crafted_jewelry": 1
                },
                "out_money": 95000,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 2.0,
                    "physical.strength": 2.0,
                    "player.player": 2.0
                },
                "description": "Deliver Jewelry.",
                "products": [],
                "location": "Jewelry Store"
            }
        },
        "key": "crafted_jewelry"
    },
    "Karin Futo": {
        "name": "Karin Futo",
        "jobs": {
            "premium.trucking": true
        },
        "value": 0,
        "pickuplocation": "",
        "craftlocation": "Vehicle Factory",
        "usagelocation": "",
        "exportlocation": "",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Karin Futo": {
                "reagents": {
                    "mechanicals_chassis": 1,
                    "mechanicals_wheels": 4,
                    "crafted_fiberglass": 15,
                    "refined_amalgam": 50,
                    "crafted_circuit": 5,
                    "mechanicals_battery": 1,
                    "refined_glass": 25,
                    "mechanicals_vehicle_framework": 1
                },
                "description": "Karin Futo",
                "out_money": 0,
                "in_money": 220000,
                "aptitudes": {
                    "trucking.trucking": 13.0,
                    "physical.strength": 13.0,
                    "player.player": 12.0
                },
                "products": {
                    "vehicle_shipment|futo|Karin Futo|car": 1
                },
                "location": "Vehicle Factory"
            }
        },
        "usage": {},
        "export": {},
        "key": "vehicle_shipment|futo|Karin Futo|car"
    },
    "Kerosene": {
        "name": "Kerosene",
        "jobs": {
            "liberty": true,
            "petrochem": true,
            "military": true,
            "premium.trucking": true
        },
        "value": 15000,
        "pickuplocation": "",
        "craftlocation": "AM Petroleum",
        "usagelocation": "Military Workshop",
        "exportlocation": "Bristols Fuel Storage",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Tokens to Kerosene x10": {
                "reagents": {
                    "liberty_token": 10
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": [],
                "description": "Liberty Token -> Kerosene",
                "products": {
                    "petrochem_kerosene": 10
                },
                "location": "AM Petroleum"
            },
            "Tokens to Kerosene": {
                "reagents": {
                    "liberty_token": 1
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": [],
                "description": "Liberty Token -> Kerosene",
                "products": {
                    "petrochem_kerosene": 1
                },
                "location": "AM Petroleum"
            },
            "Refine Rubber": {
                "reagents": {
                    "petrochem_oil": 4
                },
                "out_money": 0,
                "in_money": 41000,
                "aptitudes": [],
                "description": "Refine Rubber",
                "products": {
                    "mechanicals_rubber": 4,
                    "petrochem_diesel": 2,
                    "petrochem_petrol": 4,
                    "petrochem_kerosene": 2
                },
                "location": "Refinery"
            },
            "Refine Crude Oil x2": {
                "reagents": {
                    "petrochem_oil": 2
                },
                "out_money": 0,
                "in_money": 20500,
                "aptitudes": {
                    "trucking.trucking": 12.9,
                    "physical.strength": 12.9,
                    "player.player": 12.9
                },
                "description": "Refine Crude Oil x2",
                "products": {
                    "petrochem_diesel": 2,
                    "petrochem_petrol": 4,
                    "petrochem_kerosene": 2
                },
                "location": "Refinery"
            },
            "Refine Diluted Fuel": {
                "permissionsText": "Diluted Fuel Refining Secret",
                "in_money": 10250,
                "aptitudes": {
                    "trucking.trucking": 8.81,
                    "physical.strength": 8.81,
                    "player.player": 8.81
                },
                "products": {
                    "petrochem_diesel": 3,
                    "petrochem_petrol": 3,
                    "petrochem_kerosene": 20
                },
                "secret": true,
                "description": "Refine Diluted Fuel",
                "reagents": {
                    "petrochem_oil": 3,
                    "liquid_water": 2
                },
                "permissions": [
                    "sd.trucking.dilutedfuel"
                ],
                "out_money": 0,
                "location": "Refinery"
            },
            "Refine Crude Oil": {
                "reagents": {
                    "petrochem_oil": 1
                },
                "out_money": 0,
                "in_money": 10250,
                "aptitudes": {
                    "trucking.trucking": 6.45,
                    "physical.strength": 6.45,
                    "player.player": 6.45
                },
                "description": "Refine Crude Oil",
                "products": {
                    "petrochem_diesel": 1,
                    "petrochem_petrol": 2,
                    "petrochem_kerosene": 1
                },
                "location": "Refinery"
            }
        },
        "usage": {
            "Create Explosives": {
                "reagents": {
                    "petrochem_sulfur": 10,
                    "petrochem_kerosene": 8
                },
                "out_money": 0,
                "in_money": 9500,
                "aptitudes": {
                    "trucking.trucking": 8.34,
                    "physical.strength": 8.34,
                    "player.player": 8.34
                },
                "description": "Create Explosives",
                "products": {
                    "military_explosives": 1
                },
                "location": "Military Workshop"
            },
            "Coil Rocket Voltic": {
                "reagents": {
                    "mechanicals_wheels": 4,
                    "crafted_fiberglass": 15,
                    "petrochem_kerosene": 100,
                    "mechanicals_chassis": 1,
                    "refined_amalgam": 50,
                    "refined_glass": 25,
                    "mechanicals_battery": 1,
                    "crafted_circuit": 5,
                    "mechanicals_vehicle_framework": 1
                },
                "description": "Coil Rocket Voltic",
                "out_money": 0,
                "in_money": 90110000,
                "aptitudes": {
                    "trucking.trucking": 13.0,
                    "physical.strength": 13.0,
                    "player.player": 12.0
                },
                "products": {
                    "upgrade_kit_voltic2": 1
                },
                "location": "Vehicle Factory"
            },
            "Fill Plane Cans": {
                "reagents": {
                    "petrochem_kerosene": 1
                },
                "out_money": 11000,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 1.9,
                    "physical.strength": 1.9,
                    "player.player": 1.9
                },
                "description": "Fill Plane Cans",
                "products": {
                    "jerry_can|PLANE|Plane": 10
                },
                "location": "Oil Depository"
            },
            "Fill Helicoper Cans": {
                "reagents": {
                    "petrochem_kerosene": 1
                },
                "out_money": 11000,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 1.9,
                    "physical.strength": 1.9,
                    "player.player": 1.9
                },
                "description": "Fill Helicoper Cans",
                "products": {
                    "jerry_can|HELICOPTER|Helicopter": 10
                },
                "location": "Oil Depository"
            }
        },
        "export": {
            "Sell Kerosene x10": {
                "reagents": {
                    "petrochem_kerosene": 10
                },
                "out_money": 150000,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 3.9,
                    "physical.strength": 3.9,
                    "player.player": 3.9
                },
                "description": "Sell Kerosene",
                "products": [],
                "location": "Bristols Fuel Storage"
            },
            "Sell Kerosene": {
                "reagents": {
                    "petrochem_kerosene": 1
                },
                "out_money": 15000,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 0.39,
                    "physical.strength": 0.39,
                    "player.player": 0.39
                },
                "description": "Sell Kerosene",
                "products": [],
                "location": "Bristols Fuel Storage"
            }
        },
        "key": "petrochem_kerosene"
    },
    "Landstalker Xl": {
        "name": "Landstalker Xl",
        "jobs": {
            "premium.trucking": true
        },
        "value": 0,
        "pickuplocation": "",
        "craftlocation": "Vehicle Factory",
        "usagelocation": "",
        "exportlocation": "",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Landstalker XL": {
                "permissionsText": "Landstalker XL Blueprints Secret",
                "in_money": 32000000,
                "aptitudes": {
                    "trucking.trucking": 130.0,
                    "physical.strength": 130.0,
                    "player.player": 120.0
                },
                "products": {
                    "vehicle_shipment|landstalker2|Landstalker XL|car": 1
                },
                "secret": true,
                "description": "Landstalker XL",
                "reagents": {
                    "mechanicals_chassis": 1,
                    "mechanicals_wheels": 4,
                    "crafted_fiberglass": 30,
                    "refined_amalgam": 100,
                    "crafted_circuit": 10,
                    "mechanicals_battery": 2,
                    "refined_glass": 50,
                    "mechanicals_vehicle_framework": 1
                },
                "permissions": [
                    "sd.trucking.shipment.landstalker2"
                ],
                "out_money": 0,
                "location": "Vehicle Factory"
            }
        },
        "usage": {},
        "export": {},
        "key": "vehicle_shipment|landstalker2|Landstalker XL|car"
    },
    "Liberty Autopart": {
        "name": "Liberty Autopart",
        "jobs": {
            "liberty": true
        },
        "value": 0,
        "pickuplocation": "Auto Yard",
        "craftlocation": "",
        "usagelocation": "Staunton Military Facility",
        "exportlocation": "",
        "permissions": "",
        "pickup": {
            "Salvage Auto Parts x3": {
                "reagents": [],
                "out_money": 0,
                "in_money": 0,
                "aptitudes": [],
                "description": "Auto Parts",
                "products": {
                    "liberty_autopart": 3
                },
                "location": "Auto Yard"
            },
            "Salvage Auto Parts": {
                "reagents": [],
                "out_money": 0,
                "in_money": 0,
                "aptitudes": [],
                "description": "Auto Parts",
                "products": {
                    "liberty_autopart": 1
                },
                "location": "Auto Yard"
            }
        },
        "crafting": {},
        "usage": {
            "Process Auto Parts x3": {
                "reagents": {
                    "liberty_autopart": 3
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 5.28,
                    "physical.strength": 5.28,
                    "player.player": 5.28
                },
                "description": "Auto Parts -> Military Goods",
                "products": {
                    "liberty_military_goods": 3
                },
                "location": "Staunton Military Facility"
            },
            "Process Auto Parts": {
                "reagents": {
                    "liberty_autopart": 1
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 1.76,
                    "physical.strength": 1.76,
                    "player.player": 1.76
                },
                "description": "Auto Parts -> Military Goods",
                "products": {
                    "liberty_military_goods": 1
                },
                "location": "Staunton Military Facility"
            }
        },
        "export": {},
        "key": "liberty_autopart"
    },
    "Liberty Broadcast": {
        "name": "Liberty Broadcast",
        "jobs": {
            "liberty": true
        },
        "value": 0,
        "pickuplocation": "Staunton Business Center",
        "craftlocation": "",
        "usagelocation": "Radio Station",
        "exportlocation": "",
        "permissions": "",
        "pickup": {
            "Pick up Broadcast x3": {
                "reagents": [],
                "out_money": 0,
                "in_money": 0,
                "aptitudes": [],
                "description": "Broadcast",
                "products": {
                    "liberty_broadcast": 3
                },
                "location": "Staunton Business Center"
            },
            "Pick up Broadcast": {
                "reagents": [],
                "out_money": 0,
                "in_money": 0,
                "aptitudes": [],
                "description": "Broadcast",
                "products": {
                    "liberty_broadcast": 1
                },
                "location": "Staunton Business Center"
            }
        },
        "crafting": {},
        "usage": {
            "Spread Broadcast": {
                "reagents": {
                    "liberty_broadcast": 1
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 2.37,
                    "physical.strength": 2.37,
                    "player.player": 2.37
                },
                "description": "Broadcast",
                "products": {
                    "liberty_broadcast_portland": 1,
                    "liberty_broadcast_staunton": 1,
                    "liberty_broadcast_shoreside": 1
                },
                "location": "Radio Station"
            },
            "Spread Broadcast x3": {
                "reagents": {
                    "liberty_broadcast": 3
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 7.11,
                    "physical.strength": 7.11,
                    "player.player": 7.11
                },
                "description": "Broadcast",
                "products": {
                    "liberty_broadcast_portland": 3,
                    "liberty_broadcast_staunton": 3,
                    "liberty_broadcast_shoreside": 3
                },
                "location": "Radio Station"
            }
        },
        "export": {},
        "key": "liberty_broadcast"
    },
    "Liberty Broadcast Portland": {
        "name": "Liberty Broadcast Portland",
        "jobs": {
            "liberty": true
        },
        "value": 0,
        "pickuplocation": "",
        "craftlocation": "Radio Station",
        "usagelocation": "Chinatown",
        "exportlocation": "",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Spread Broadcast": {
                "reagents": {
                    "liberty_broadcast": 1
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 2.37,
                    "physical.strength": 2.37,
                    "player.player": 2.37
                },
                "description": "Broadcast",
                "products": {
                    "liberty_broadcast_portland": 1,
                    "liberty_broadcast_staunton": 1,
                    "liberty_broadcast_shoreside": 1
                },
                "location": "Radio Station"
            },
            "Spread Broadcast x3": {
                "reagents": {
                    "liberty_broadcast": 3
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 7.11,
                    "physical.strength": 7.11,
                    "player.player": 7.11
                },
                "description": "Broadcast",
                "products": {
                    "liberty_broadcast_portland": 3,
                    "liberty_broadcast_staunton": 3,
                    "liberty_broadcast_shoreside": 3
                },
                "location": "Radio Station"
            }
        },
        "usage": {
            "Deliver Portland Broadcast x10": {
                "reagents": {
                    "liberty_broadcast_portland": 10
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 2.4,
                    "physical.strength": 2.4,
                    "player.player": 2.4
                },
                "description": "Portland Broadcast",
                "products": {
                    "liberty_voucher_portland": 10
                },
                "location": "Chinatown"
            },
            "Deliver Portland Broadcast": {
                "reagents": {
                    "liberty_broadcast_portland": 1
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 0.24,
                    "physical.strength": 0.24,
                    "player.player": 0.24
                },
                "description": "Portland Broadcast",
                "products": {
                    "liberty_voucher_portland": 1
                },
                "location": "Chinatown"
            }
        },
        "export": {},
        "key": "liberty_broadcast_portland"
    },
    "Liberty Broadcast Shoreside": {
        "name": "Liberty Broadcast Shoreside",
        "jobs": {
            "liberty": true
        },
        "value": 0,
        "pickuplocation": "",
        "craftlocation": "Radio Station",
        "usagelocation": "Shoreside Apartments",
        "exportlocation": "",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Spread Broadcast": {
                "reagents": {
                    "liberty_broadcast": 1
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 2.37,
                    "physical.strength": 2.37,
                    "player.player": 2.37
                },
                "description": "Broadcast",
                "products": {
                    "liberty_broadcast_portland": 1,
                    "liberty_broadcast_staunton": 1,
                    "liberty_broadcast_shoreside": 1
                },
                "location": "Radio Station"
            },
            "Spread Broadcast x3": {
                "reagents": {
                    "liberty_broadcast": 3
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 7.11,
                    "physical.strength": 7.11,
                    "player.player": 7.11
                },
                "description": "Broadcast",
                "products": {
                    "liberty_broadcast_portland": 3,
                    "liberty_broadcast_staunton": 3,
                    "liberty_broadcast_shoreside": 3
                },
                "location": "Radio Station"
            }
        },
        "usage": {
            "Deliver Shoreside Broadcast": {
                "reagents": {
                    "liberty_broadcast_shoreside": 1
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 0.51,
                    "physical.strength": 0.51,
                    "player.player": 0.51
                },
                "description": "Shoreside Broadcast",
                "products": {
                    "liberty_voucher_shoreside": 1
                },
                "location": "Shoreside Apartments"
            },
            "Deliver Shoreside Broadcast x10": {
                "reagents": {
                    "liberty_broadcast_shoreside": 10
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 5.1,
                    "physical.strength": 5.1,
                    "player.player": 5.1
                },
                "description": "Shoreside Broadcast",
                "products": {
                    "liberty_voucher_shoreside": 10
                },
                "location": "Shoreside Apartments"
            }
        },
        "export": {},
        "key": "liberty_broadcast_shoreside"
    },
    "Liberty Broadcast Staunton": {
        "name": "Liberty Broadcast Staunton",
        "jobs": {
            "liberty": true
        },
        "value": 0,
        "pickuplocation": "",
        "craftlocation": "Radio Station",
        "usagelocation": "Staunton Casino",
        "exportlocation": "",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Spread Broadcast": {
                "reagents": {
                    "liberty_broadcast": 1
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 2.37,
                    "physical.strength": 2.37,
                    "player.player": 2.37
                },
                "description": "Broadcast",
                "products": {
                    "liberty_broadcast_portland": 1,
                    "liberty_broadcast_staunton": 1,
                    "liberty_broadcast_shoreside": 1
                },
                "location": "Radio Station"
            },
            "Spread Broadcast x3": {
                "reagents": {
                    "liberty_broadcast": 3
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 7.11,
                    "physical.strength": 7.11,
                    "player.player": 7.11
                },
                "description": "Broadcast",
                "products": {
                    "liberty_broadcast_portland": 3,
                    "liberty_broadcast_staunton": 3,
                    "liberty_broadcast_shoreside": 3
                },
                "location": "Radio Station"
            }
        },
        "usage": {
            "Deliver Staunton Broadcast x10": {
                "reagents": {
                    "liberty_broadcast_staunton": 10
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 4.6,
                    "physical.strength": 4.6,
                    "player.player": 4.6
                },
                "description": "Staunton Broadcast",
                "products": {
                    "liberty_voucher_staunton": 10
                },
                "location": "Staunton Casino"
            },
            "Deliver Staunton Broadcast": {
                "reagents": {
                    "liberty_broadcast_staunton": 1
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 0.46,
                    "physical.strength": 0.46,
                    "player.player": 0.46
                },
                "description": "Staunton Broadcast",
                "products": {
                    "liberty_voucher_staunton": 1
                },
                "location": "Staunton Casino"
            }
        },
        "export": {},
        "key": "liberty_broadcast_staunton"
    },
    "Liberty Export Goods": {
        "name": "Liberty Export Goods",
        "jobs": {
            "liberty": true
        },
        "value": 0,
        "pickuplocation": "",
        "craftlocation": "Cochrane Dam",
        "usagelocation": "Portland Docks",
        "exportlocation": "",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Process Military Goods x3": {
                "reagents": {
                    "liberty_military_goods": 3
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 6.0,
                    "physical.strength": 6.0,
                    "player.player": 6.0
                },
                "description": "Military Goods -> Export Goods",
                "products": {
                    "liberty_export_goods": 3
                },
                "location": "Cochrane Dam"
            },
            "Process Military Goods": {
                "reagents": {
                    "liberty_military_goods": 1
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 2.0,
                    "physical.strength": 2.0,
                    "player.player": 2.0
                },
                "description": "Military Goods -> Export Goods",
                "products": {
                    "liberty_export_goods": 1
                },
                "location": "Cochrane Dam"
            }
        },
        "usage": {
            "Export Goods x3": {
                "reagents": {
                    "liberty_export_goods": 3
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 6.42,
                    "physical.strength": 6.42,
                    "player.player": 6.42
                },
                "description": "Export Goods",
                "products": {
                    "liberty_voucher_goods": 3,
                    "liberty_token": 3
                },
                "location": "Portland Docks"
            },
            "Export Goods": {
                "reagents": {
                    "liberty_export_goods": 1
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 2.14,
                    "physical.strength": 2.14,
                    "player.player": 2.14
                },
                "description": "Export Goods",
                "products": {
                    "liberty_voucher_goods": 1,
                    "liberty_token": 1
                },
                "location": "Portland Docks"
            }
        },
        "export": {},
        "key": "liberty_export_goods"
    },
    "Liberty Fish Export": {
        "name": "Liberty Fish Export",
        "jobs": {
            "liberty": true
        },
        "value": 0,
        "pickuplocation": "",
        "craftlocation": "Fish Factory",
        "usagelocation": "Staunton Docks",
        "exportlocation": "",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Package Fish x2": {
                "reagents": {
                    "liberty_fish_shoreside": 2,
                    "liberty_fish_portland": 2
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 6.6,
                    "physical.strength": 6.6,
                    "player.player": 6.6
                },
                "description": "Package Fish",
                "products": {
                    "liberty_fish_export": 2
                },
                "location": "Fish Factory"
            },
            "Package Fish": {
                "reagents": {
                    "liberty_fish_shoreside": 1,
                    "liberty_fish_portland": 1
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 3.3,
                    "physical.strength": 3.3,
                    "player.player": 3.3
                },
                "description": "Package Fish",
                "products": {
                    "liberty_fish_export": 1
                },
                "location": "Fish Factory"
            }
        },
        "usage": {
            "Export Fish x3": {
                "reagents": {
                    "liberty_fish_export": 3
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 5.72999999999999,
                    "physical.strength": 5.72999999999999,
                    "player.player": 5.72999999999999
                },
                "description": "Export Fish",
                "products": {
                    "liberty_voucher_fish": 3,
                    "liberty_token": 3
                },
                "location": "Staunton Docks"
            },
            "Export Fish": {
                "reagents": {
                    "liberty_fish_export": 1
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 1.91,
                    "physical.strength": 1.91,
                    "player.player": 1.91
                },
                "description": "Export Fish",
                "products": {
                    "liberty_voucher_fish": 1,
                    "liberty_token": 1
                },
                "location": "Staunton Docks"
            }
        },
        "export": {},
        "key": "liberty_fish_export"
    },
    "Liberty Fish Portland": {
        "name": "Liberty Fish Portland",
        "jobs": {
            "liberty": true
        },
        "value": 0,
        "pickuplocation": "Turtle Head Fishing Co. Portland",
        "craftlocation": "",
        "usagelocation": "Fish Factory",
        "exportlocation": "",
        "permissions": "",
        "pickup": {
            "Pick up Portland Fish": {
                "reagents": [],
                "out_money": 0,
                "in_money": 0,
                "aptitudes": [],
                "description": "Portland Fish",
                "products": {
                    "liberty_fish_portland": 1
                },
                "location": "Turtle Head Fishing Co. Portland"
            },
            "Pick up Portland Fish x4": {
                "reagents": [],
                "out_money": 0,
                "in_money": 0,
                "aptitudes": [],
                "description": "Portland Fish",
                "products": {
                    "liberty_fish_portland": 4
                },
                "location": "Turtle Head Fishing Co. Portland"
            }
        },
        "crafting": {},
        "usage": {
            "Package Fish x2": {
                "reagents": {
                    "liberty_fish_shoreside": 2,
                    "liberty_fish_portland": 2
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 6.6,
                    "physical.strength": 6.6,
                    "player.player": 6.6
                },
                "description": "Package Fish",
                "products": {
                    "liberty_fish_export": 2
                },
                "location": "Fish Factory"
            },
            "Package Fish": {
                "reagents": {
                    "liberty_fish_shoreside": 1,
                    "liberty_fish_portland": 1
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 3.3,
                    "physical.strength": 3.3,
                    "player.player": 3.3
                },
                "description": "Package Fish",
                "products": {
                    "liberty_fish_export": 1
                },
                "location": "Fish Factory"
            }
        },
        "export": {},
        "key": "liberty_fish_portland"
    },
    "Liberty Fish Shoreside": {
        "name": "Liberty Fish Shoreside",
        "jobs": {
            "liberty": true
        },
        "value": 0,
        "pickuplocation": "Turtle Head Fishing Co. Shoreside Vale",
        "craftlocation": "",
        "usagelocation": "Fish Factory",
        "exportlocation": "",
        "permissions": "",
        "pickup": {
            "Pick up Shoreside Fish": {
                "reagents": [],
                "out_money": 0,
                "in_money": 0,
                "aptitudes": [],
                "description": "Shoreside Fish",
                "products": {
                    "liberty_fish_shoreside": 1
                },
                "location": "Turtle Head Fishing Co. Shoreside Vale"
            },
            "Pick up Shoreside Fish x4": {
                "reagents": [],
                "out_money": 0,
                "in_money": 0,
                "aptitudes": [],
                "description": "Shoreside Fish",
                "products": {
                    "liberty_fish_shoreside": 4
                },
                "location": "Turtle Head Fishing Co. Shoreside Vale"
            }
        },
        "crafting": {},
        "usage": {
            "Package Fish x2": {
                "reagents": {
                    "liberty_fish_shoreside": 2,
                    "liberty_fish_portland": 2
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 6.6,
                    "physical.strength": 6.6,
                    "player.player": 6.6
                },
                "description": "Package Fish",
                "products": {
                    "liberty_fish_export": 2
                },
                "location": "Fish Factory"
            },
            "Package Fish": {
                "reagents": {
                    "liberty_fish_shoreside": 1,
                    "liberty_fish_portland": 1
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 3.3,
                    "physical.strength": 3.3,
                    "player.player": 3.3
                },
                "description": "Package Fish",
                "products": {
                    "liberty_fish_export": 1
                },
                "location": "Fish Factory"
            }
        },
        "export": {},
        "key": "liberty_fish_shoreside"
    },
    "Liberty Goods": {
        "name": "Liberty Goods",
        "jobs": {
            "liberty": true,
            "premium.trucking": true
        },
        "value": 0,
        "pickuplocation": "",
        "craftlocation": "Staunton Mall",
        "usagelocation": "Cochrane Dam",
        "exportlocation": "",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Trade for Liberty Goods": {
                "reagents": {
                    "liberty_voucher_fish": 1,
                    "liberty_voucher_goods": 1
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": [],
                "description": "Liberty Goods",
                "products": {
                    "liberty_goods": 1
                },
                "location": "Staunton Mall"
            },
            "Trade for Liberty Goods x3": {
                "reagents": {
                    "liberty_voucher_fish": 3,
                    "liberty_voucher_goods": 3
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": [],
                "description": "Liberty Goods",
                "products": {
                    "liberty_goods": 3
                },
                "location": "Staunton Mall"
            },
            "Process Auto Parts x3": {
                "reagents": {
                    "liberty_autopart": 3
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 5.28,
                    "physical.strength": 5.28,
                    "player.player": 5.28
                },
                "description": "Auto Parts -> Military Goods",
                "products": {
                    "liberty_military_goods": 3
                },
                "location": "Staunton Military Facility"
            },
            "Process Auto Parts": {
                "reagents": {
                    "liberty_autopart": 1
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 1.76,
                    "physical.strength": 1.76,
                    "player.player": 1.76
                },
                "description": "Auto Parts -> Military Goods",
                "products": {
                    "liberty_military_goods": 1
                },
                "location": "Staunton Military Facility"
            }
        },
        "usage": {
            "Process Military Goods x3": {
                "reagents": {
                    "liberty_military_goods": 3
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 6.0,
                    "physical.strength": 6.0,
                    "player.player": 6.0
                },
                "description": "Military Goods -> Export Goods",
                "products": {
                    "liberty_export_goods": 3
                },
                "location": "Cochrane Dam"
            },
            "Process Military Goods": {
                "reagents": {
                    "liberty_military_goods": 1
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 2.0,
                    "physical.strength": 2.0,
                    "player.player": 2.0
                },
                "description": "Military Goods -> Export Goods",
                "products": {
                    "liberty_export_goods": 1
                },
                "location": "Cochrane Dam"
            },
            "HVY Nightshark": {
                "reagents": {
                    "liquid_water": 1,
                    "mechanicals_wheels": 4,
                    "crafted_fiberglass": 25,
                    "military_titanium": 60,
                    "mechanicals_vehicle_framework": 2,
                    "mechanicals_battery": 2,
                    "mechanicals_chassis": 2,
                    "crafted_circuit": 12,
                    "refined_glass": 15,
                    "refined_amalgam": 40,
                    "liberty_military_goods": 4
                },
                "description": "HVY Nightshark",
                "out_money": 0,
                "in_money": 13780000,
                "aptitudes": {
                    "trucking.trucking": 13.0,
                    "physical.strength": 13.0,
                    "player.player": 12.0
                },
                "products": {
                    "vehicle_shipment|nightshark|HVY Nightshark|car": 1
                },
                "location": "Vehicle Factory"
            },
            "Deliver Liberty Goods x3": {
                "reagents": {
                    "liberty_goods": 3
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 15.75,
                    "physical.strength": 15.75,
                    "player.player": 15.75
                },
                "description": "Liberty Goods",
                "products": {
                    "liberty_voucher_islands": 3
                },
                "location": "Francis Intl. Airport"
            },
            "Deliver Liberty Goods": {
                "reagents": {
                    "liberty_goods": 1
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 5.25,
                    "physical.strength": 5.25,
                    "player.player": 5.25
                },
                "description": "Liberty Goods",
                "products": {
                    "liberty_voucher_islands": 1
                },
                "location": "Francis Intl. Airport"
            }
        },
        "export": {},
        "key": "liberty_goods"
    },
    "Liberty Token": {
        "name": "Liberty Token",
        "jobs": {
            "liberty": true
        },
        "value": 0,
        "pickuplocation": "",
        "craftlocation": "Staunton Docks",
        "usagelocation": "AM Petroleum",
        "exportlocation": "",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Export Fish x3": {
                "reagents": {
                    "liberty_fish_export": 3
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 5.72999999999999,
                    "physical.strength": 5.72999999999999,
                    "player.player": 5.72999999999999
                },
                "description": "Export Fish",
                "products": {
                    "liberty_voucher_fish": 3,
                    "liberty_token": 3
                },
                "location": "Staunton Docks"
            },
            "Export Fish": {
                "reagents": {
                    "liberty_fish_export": 1
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 1.91,
                    "physical.strength": 1.91,
                    "player.player": 1.91
                },
                "description": "Export Fish",
                "products": {
                    "liberty_voucher_fish": 1,
                    "liberty_token": 1
                },
                "location": "Staunton Docks"
            },
            "Export Goods x3": {
                "reagents": {
                    "liberty_export_goods": 3
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 6.42,
                    "physical.strength": 6.42,
                    "player.player": 6.42
                },
                "description": "Export Goods",
                "products": {
                    "liberty_voucher_goods": 3,
                    "liberty_token": 3
                },
                "location": "Portland Docks"
            },
            "Export Goods": {
                "reagents": {
                    "liberty_export_goods": 1
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 2.14,
                    "physical.strength": 2.14,
                    "player.player": 2.14
                },
                "description": "Export Goods",
                "products": {
                    "liberty_voucher_goods": 1,
                    "liberty_token": 1
                },
                "location": "Portland Docks"
            }
        },
        "usage": {
            "Tokens to Kerosene x10": {
                "reagents": {
                    "liberty_token": 10
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": [],
                "description": "Liberty Token -> Kerosene",
                "products": {
                    "petrochem_kerosene": 10
                },
                "location": "AM Petroleum"
            },
            "Tokens to Kerosene": {
                "reagents": {
                    "liberty_token": 1
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": [],
                "description": "Liberty Token -> Kerosene",
                "products": {
                    "petrochem_kerosene": 1
                },
                "location": "AM Petroleum"
            },
            "Tokens to Treated Water x3": {
                "reagents": {
                    "liberty_token": 3
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": [],
                "description": "Liberty Token -> Treated Water",
                "products": {
                    "liquid_water": 3
                },
                "location": "LCFD"
            },
            "Tokens to Treated Water": {
                "reagents": {
                    "liberty_token": 1
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": [],
                "description": "Liberty Token -> Treated Water",
                "products": {
                    "liquid_water": 1
                },
                "location": "LCFD"
            },
            "Tokens to Fridge Store Delivery": {
                "reagents": {
                    "liberty_token": 1
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": [],
                "description": "Liberty Token -> Fridge Store Delivery",
                "products": {
                    "fridge_store_delivery": 1
                },
                "location": "The Undercover Storage Co."
            },
            "Tokens to Airline Meal": {
                "reagents": {
                    "liberty_token": 1
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": [],
                "description": "Liberty Token -> Airline Meal",
                "products": {
                    "fridge_airline_meal": 1
                },
                "location": "The Undercover Storage Co."
            }
        },
        "export": {},
        "key": "liberty_token"
    },
    "Liberty Voucher Fish": {
        "name": "Liberty Voucher Fish",
        "jobs": {
            "liberty": true
        },
        "value": 0,
        "pickuplocation": "",
        "craftlocation": "Staunton Docks",
        "usagelocation": "Staunton Mall",
        "exportlocation": "",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Export Fish x3": {
                "reagents": {
                    "liberty_fish_export": 3
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 5.72999999999999,
                    "physical.strength": 5.72999999999999,
                    "player.player": 5.72999999999999
                },
                "description": "Export Fish",
                "products": {
                    "liberty_voucher_fish": 3,
                    "liberty_token": 3
                },
                "location": "Staunton Docks"
            },
            "Export Fish": {
                "reagents": {
                    "liberty_fish_export": 1
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 1.91,
                    "physical.strength": 1.91,
                    "player.player": 1.91
                },
                "description": "Export Fish",
                "products": {
                    "liberty_voucher_fish": 1,
                    "liberty_token": 1
                },
                "location": "Staunton Docks"
            }
        },
        "usage": {
            "Trade for Liberty Goods": {
                "reagents": {
                    "liberty_voucher_fish": 1,
                    "liberty_voucher_goods": 1
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": [],
                "description": "Liberty Goods",
                "products": {
                    "liberty_goods": 1
                },
                "location": "Staunton Mall"
            },
            "Trade for Liberty Goods x3": {
                "reagents": {
                    "liberty_voucher_fish": 3,
                    "liberty_voucher_goods": 3
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": [],
                "description": "Liberty Goods",
                "products": {
                    "liberty_goods": 3
                },
                "location": "Staunton Mall"
            }
        },
        "export": {},
        "key": "liberty_voucher_fish"
    },
    "Liberty Voucher Goods": {
        "name": "Liberty Voucher Goods",
        "jobs": {
            "liberty": true
        },
        "value": 0,
        "pickuplocation": "",
        "craftlocation": "Portland Docks",
        "usagelocation": "Staunton Mall",
        "exportlocation": "",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Export Goods x3": {
                "reagents": {
                    "liberty_export_goods": 3
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 6.42,
                    "physical.strength": 6.42,
                    "player.player": 6.42
                },
                "description": "Export Goods",
                "products": {
                    "liberty_voucher_goods": 3,
                    "liberty_token": 3
                },
                "location": "Portland Docks"
            },
            "Export Goods": {
                "reagents": {
                    "liberty_export_goods": 1
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 2.14,
                    "physical.strength": 2.14,
                    "player.player": 2.14
                },
                "description": "Export Goods",
                "products": {
                    "liberty_voucher_goods": 1,
                    "liberty_token": 1
                },
                "location": "Portland Docks"
            }
        },
        "usage": {
            "Trade for Liberty Goods": {
                "reagents": {
                    "liberty_voucher_fish": 1,
                    "liberty_voucher_goods": 1
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": [],
                "description": "Liberty Goods",
                "products": {
                    "liberty_goods": 1
                },
                "location": "Staunton Mall"
            },
            "Trade for Liberty Goods x3": {
                "reagents": {
                    "liberty_voucher_fish": 3,
                    "liberty_voucher_goods": 3
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": [],
                "description": "Liberty Goods",
                "products": {
                    "liberty_goods": 3
                },
                "location": "Staunton Mall"
            }
        },
        "export": {},
        "key": "liberty_voucher_goods"
    },
    "Liberty Voucher Islands": {
        "name": "Liberty Voucher Islands",
        "jobs": {
            "liberty": true
        },
        "value": 0,
        "pickuplocation": "",
        "craftlocation": "Francis Intl. Airport",
        "usagelocation": "Rooftop",
        "exportlocation": "",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Deliver Liberty Goods x3": {
                "reagents": {
                    "liberty_goods": 3
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 15.75,
                    "physical.strength": 15.75,
                    "player.player": 15.75
                },
                "description": "Liberty Goods",
                "products": {
                    "liberty_voucher_islands": 3
                },
                "location": "Francis Intl. Airport"
            },
            "Deliver Liberty Goods": {
                "reagents": {
                    "liberty_goods": 1
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 5.25,
                    "physical.strength": 5.25,
                    "player.player": 5.25
                },
                "description": "Liberty Goods",
                "products": {
                    "liberty_voucher_islands": 1
                },
                "location": "Francis Intl. Airport"
            }
        },
        "usage": {
            "Trade for Rainbow Voucher": {
                "reagents": {
                    "liberty_voucher_portland": 1,
                    "liberty_voucher_shoreside": 1,
                    "liberty_voucher_staunton": 1,
                    "liberty_voucher_islands": 1
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": [],
                "description": "Rainbow Voucher",
                "products": {
                    "rainbow_voucher": 1
                },
                "location": "Rooftop"
            }
        },
        "export": {},
        "key": "liberty_voucher_islands"
    },
    "Liberty Voucher Portland": {
        "name": "Liberty Voucher Portland",
        "jobs": {
            "liberty": true
        },
        "value": 0,
        "pickuplocation": "",
        "craftlocation": "Chinatown",
        "usagelocation": "Rooftop",
        "exportlocation": "",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Deliver Portland Broadcast x10": {
                "reagents": {
                    "liberty_broadcast_portland": 10
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 2.4,
                    "physical.strength": 2.4,
                    "player.player": 2.4
                },
                "description": "Portland Broadcast",
                "products": {
                    "liberty_voucher_portland": 10
                },
                "location": "Chinatown"
            },
            "Deliver Portland Broadcast": {
                "reagents": {
                    "liberty_broadcast_portland": 1
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 0.24,
                    "physical.strength": 0.24,
                    "player.player": 0.24
                },
                "description": "Portland Broadcast",
                "products": {
                    "liberty_voucher_portland": 1
                },
                "location": "Chinatown"
            }
        },
        "usage": {
            "Trade for Rainbow Voucher": {
                "reagents": {
                    "liberty_voucher_portland": 1,
                    "liberty_voucher_shoreside": 1,
                    "liberty_voucher_staunton": 1,
                    "liberty_voucher_islands": 1
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": [],
                "description": "Rainbow Voucher",
                "products": {
                    "rainbow_voucher": 1
                },
                "location": "Rooftop"
            }
        },
        "export": {},
        "key": "liberty_voucher_portland"
    },
    "Liberty Voucher Shoreside": {
        "name": "Liberty Voucher Shoreside",
        "jobs": {
            "liberty": true
        },
        "value": 0,
        "pickuplocation": "",
        "craftlocation": "Shoreside Apartments",
        "usagelocation": "Rooftop",
        "exportlocation": "",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Deliver Shoreside Broadcast": {
                "reagents": {
                    "liberty_broadcast_shoreside": 1
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 0.51,
                    "physical.strength": 0.51,
                    "player.player": 0.51
                },
                "description": "Shoreside Broadcast",
                "products": {
                    "liberty_voucher_shoreside": 1
                },
                "location": "Shoreside Apartments"
            },
            "Deliver Shoreside Broadcast x10": {
                "reagents": {
                    "liberty_broadcast_shoreside": 10
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 5.1,
                    "physical.strength": 5.1,
                    "player.player": 5.1
                },
                "description": "Shoreside Broadcast",
                "products": {
                    "liberty_voucher_shoreside": 10
                },
                "location": "Shoreside Apartments"
            }
        },
        "usage": {
            "Trade for Rainbow Voucher": {
                "reagents": {
                    "liberty_voucher_portland": 1,
                    "liberty_voucher_shoreside": 1,
                    "liberty_voucher_staunton": 1,
                    "liberty_voucher_islands": 1
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": [],
                "description": "Rainbow Voucher",
                "products": {
                    "rainbow_voucher": 1
                },
                "location": "Rooftop"
            }
        },
        "export": {},
        "key": "liberty_voucher_shoreside"
    },
    "Liberty Voucher Staunton": {
        "name": "Liberty Voucher Staunton",
        "jobs": {
            "liberty": true
        },
        "value": 0,
        "pickuplocation": "",
        "craftlocation": "Staunton Casino",
        "usagelocation": "Rooftop",
        "exportlocation": "",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Deliver Staunton Broadcast x10": {
                "reagents": {
                    "liberty_broadcast_staunton": 10
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 4.6,
                    "physical.strength": 4.6,
                    "player.player": 4.6
                },
                "description": "Staunton Broadcast",
                "products": {
                    "liberty_voucher_staunton": 10
                },
                "location": "Staunton Casino"
            },
            "Deliver Staunton Broadcast": {
                "reagents": {
                    "liberty_broadcast_staunton": 1
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 0.46,
                    "physical.strength": 0.46,
                    "player.player": 0.46
                },
                "description": "Staunton Broadcast",
                "products": {
                    "liberty_voucher_staunton": 1
                },
                "location": "Staunton Casino"
            }
        },
        "usage": {
            "Trade for Rainbow Voucher": {
                "reagents": {
                    "liberty_voucher_portland": 1,
                    "liberty_voucher_shoreside": 1,
                    "liberty_voucher_staunton": 1,
                    "liberty_voucher_islands": 1
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": [],
                "description": "Rainbow Voucher",
                "products": {
                    "rainbow_voucher": 1
                },
                "location": "Rooftop"
            }
        },
        "export": {},
        "key": "liberty_voucher_staunton"
    },
    "Logs": {
        "name": "Logs",
        "jobs": {
            "trucker": true,
            "@trucking.trucking.>5": true
        },
        "value": 0,
        "pickuplocation": "Logging Camp",
        "craftlocation": "",
        "usagelocation": "Sawmill",
        "exportlocation": "",
        "permissions": "",
        "pickup": {
            "Collect Logs": {
                "permissionsText": "",
                "in_money": 7500,
                "aptitudes": [],
                "products": {
                    "tcargologs": 1
                },
                "reagents": [],
                "onSelect": false,
                "permissions": false,
                "out_money": 0,
                "description": "Collect Logs from the Logging Camp",
                "onLeave": false,
                "onTransform": false,
                "cost": 1,
                "location": "Logging Camp"
            },
            "Collect Logs x5": {
                "permissionsText": "",
                "in_money": 37500,
                "aptitudes": [],
                "products": {
                    "tcargologs": 5
                },
                "reagents": [],
                "onSelect": false,
                "permissions": false,
                "out_money": 0,
                "description": "Collect Logs from the Logging Camp",
                "onLeave": false,
                "onTransform": false,
                "cost": 5,
                "location": "Logging Camp"
            },
            "Collect Logs x10": {
                "permissionsText": "",
                "in_money": 75000,
                "aptitudes": [],
                "products": {
                    "tcargologs": 10
                },
                "reagents": [],
                "onSelect": false,
                "permissions": false,
                "out_money": 0,
                "description": "Collect Logs from the Logging Camp",
                "onLeave": false,
                "onTransform": false,
                "cost": 10,
                "location": "Logging Camp"
            }
        },
        "crafting": {},
        "usage": {
            "Grind Sawdust x5": {
                "reagents": {
                    "tcargologs": 5
                },
                "out_money": 0,
                "in_money": 2500,
                "aptitudes": {
                    "trucking.trucking": 18.15,
                    "physical.strength": 18.15,
                    "player.player": 18.15
                },
                "description": "Grind a bulk of 5 Logs into Sawdust",
                "products": {
                    "tcargodust": 50
                },
                "location": "Sawmill"
            },
            "Grind Sawdust x1": {
                "reagents": {
                    "tcargologs": 1
                },
                "out_money": 0,
                "in_money": 500,
                "aptitudes": {
                    "trucking.trucking": 3.63,
                    "physical.strength": 3.63,
                    "player.player": 3.63
                },
                "description": "Grind Logs into Sawdust",
                "products": {
                    "tcargodust": 10
                },
                "location": "Sawmill"
            },
            "Mill Planks x1": {
                "reagents": {
                    "tcargologs": 1
                },
                "out_money": 0,
                "in_money": 500,
                "aptitudes": {
                    "trucking.trucking": 3.63,
                    "physical.strength": 3.63,
                    "player.player": 3.63
                },
                "description": "Make high quality planks out of the logs",
                "products": {
                    "refined_planks": 1,
                    "tcargodust": 2
                },
                "location": "Sawmill"
            },
            "Mill Planks x5": {
                "reagents": {
                    "tcargologs": 5
                },
                "out_money": 0,
                "in_money": 2500,
                "aptitudes": {
                    "trucking.trucking": 18.15,
                    "physical.strength": 18.15,
                    "player.player": 18.15
                },
                "description": "Make high quality planks out of the bulk of 5 logs",
                "products": {
                    "refined_planks": 5,
                    "tcargodust": 10
                },
                "location": "Sawmill"
            },
            "Chipboard Planks": {
                "permissionsText": "Chipboard Planks Secret",
                "in_money": 2500,
                "aptitudes": {
                    "trucking.trucking": 18.15,
                    "physical.strength": 18.15,
                    "player.player": 18.15
                },
                "products": {
                    "refined_planks": 15
                },
                "secret": true,
                "description": "Make high quality planks out of the bulk of 5 logs",
                "reagents": {
                    "tcargodust": 30,
                    "tcargologs": 5
                },
                "permissions": [
                    "sd.trucking.sawmill.plank"
                ],
                "out_money": 0,
                "location": "Sawmill"
            },
            "Sawdust Filler Exploit": {
                "permissionsText": "Sawdust Filler Exploit Secret",
                "in_money": 2500,
                "aptitudes": {
                    "trucking.trucking": 36.3,
                    "physical.strength": 36.3,
                    "player.player": 36.3
                },
                "products": {
                    "tcargodust": 100
                },
                "secret": true,
                "description": "Grind a bulk of 5 Logs into Sawdust",
                "reagents": {
                    "tcargologs": 5,
                    "refined_sand": 10
                },
                "permissions": [
                    "sd.trucking.sawmill.sawdust"
                ],
                "out_money": 0,
                "location": "Sawmill"
            }
        },
        "export": {},
        "key": "tcargologs"
    },
    "Meat": {
        "name": "Meat",
        "jobs": {
            "fridge": true,
            "trucker": true
        },
        "value": 0,
        "pickuplocation": "",
        "craftlocation": "Raven Slaughterhouse",
        "usagelocation": "Clucking Bell Farms",
        "exportlocation": "",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Rabbit x10": {
                "in_money": 20000,
                "aptitudes": {
                    "hunting.skill": 3.0
                },
                "products": {
                    "meat": 20
                },
                "onSelect": false,
                "reagents": {
                    "hide_rabbit": 10
                },
                "out_money": 0,
                "description": "Rabbit x10",
                "onLeave": false,
                "onTransform": false,
                "cost": 10,
                "location": "Raven Slaughterhouse"
            },
            "Leopard x10": {
                "in_money": 20000,
                "aptitudes": {
                    "hunting.skill": 30.0
                },
                "products": {
                    "meat": 200
                },
                "onSelect": false,
                "reagents": {
                    "hide_leopard": 10
                },
                "out_money": 0,
                "description": "Leopard x10",
                "onLeave": false,
                "onTransform": false,
                "cost": 10,
                "location": "Raven Slaughterhouse"
            },
            "Cougar x10": {
                "in_money": 20000,
                "aptitudes": {
                    "hunting.skill": 15.0
                },
                "products": {
                    "meat": 100
                },
                "onSelect": false,
                "reagents": {
                    "hide_mtlion": 10
                },
                "out_money": 0,
                "description": "Cougar x10",
                "onLeave": false,
                "onTransform": false,
                "cost": 10,
                "location": "Raven Slaughterhouse"
            },
            "Rat x1": {
                "in_money": 2000,
                "aptitudes": {
                    "hunting.skill": 0.15
                },
                "products": {
                    "meat": 1
                },
                "onSelect": false,
                "reagents": {
                    "hide_rat": 1
                },
                "out_money": 0,
                "description": "Rat x1",
                "onLeave": false,
                "onTransform": false,
                "cost": 1,
                "location": "Raven Slaughterhouse"
            },
            "Brown Bear x1": {
                "in_money": 2000,
                "aptitudes": {
                    "hunting.skill": 6.0
                },
                "products": {
                    "meat": 40
                },
                "onSelect": false,
                "reagents": {
                    "hide_bear": 1
                },
                "out_money": 0,
                "description": "Brown Bear x1",
                "onLeave": false,
                "onTransform": false,
                "cost": 1,
                "location": "Raven Slaughterhouse"
            },
            "Boar x10": {
                "in_money": 20000,
                "aptitudes": {
                    "hunting.skill": 30.0
                },
                "products": {
                    "meat": 200
                },
                "onSelect": false,
                "reagents": {
                    "hide_boar": 10
                },
                "out_money": 0,
                "description": "Boar x10",
                "onLeave": false,
                "onTransform": false,
                "cost": 10,
                "location": "Raven Slaughterhouse"
            },
            "Rat x10": {
                "in_money": 20000,
                "aptitudes": {
                    "hunting.skill": 1.5
                },
                "products": {
                    "meat": 10
                },
                "onSelect": false,
                "reagents": {
                    "hide_rat": 10
                },
                "out_money": 0,
                "description": "Rat x10",
                "onLeave": false,
                "onTransform": false,
                "cost": 10,
                "location": "Raven Slaughterhouse"
            },
            "Deer x1": {
                "in_money": 2000,
                "aptitudes": {
                    "hunting.skill": 1.79999999999999
                },
                "products": {
                    "meat": 12
                },
                "onSelect": false,
                "reagents": {
                    "hide_deer": 1
                },
                "out_money": 0,
                "description": "Deer x1",
                "onLeave": false,
                "onTransform": false,
                "cost": 1,
                "location": "Raven Slaughterhouse"
            },
            "Lion x10": {
                "in_money": 20000,
                "aptitudes": {
                    "hunting.skill": 30.0
                },
                "products": {
                    "meat": 200
                },
                "onSelect": false,
                "reagents": {
                    "hide_lion": 10
                },
                "out_money": 0,
                "description": "Lion x10",
                "onLeave": false,
                "onTransform": false,
                "cost": 10,
                "location": "Raven Slaughterhouse"
            },
            "Brown Bear x10": {
                "in_money": 20000,
                "aptitudes": {
                    "hunting.skill": 60.0
                },
                "products": {
                    "meat": 400
                },
                "onSelect": false,
                "reagents": {
                    "hide_bear": 10
                },
                "out_money": 0,
                "description": "Brown Bear x10",
                "onLeave": false,
                "onTransform": false,
                "cost": 10,
                "location": "Raven Slaughterhouse"
            },
            "Cougar x1": {
                "in_money": 2000,
                "aptitudes": {
                    "hunting.skill": 1.5
                },
                "products": {
                    "meat": 10
                },
                "onSelect": false,
                "reagents": {
                    "hide_mtlion": 1
                },
                "out_money": 0,
                "description": "Cougar x1",
                "onLeave": false,
                "onTransform": false,
                "cost": 1,
                "location": "Raven Slaughterhouse"
            },
            "Lion x1": {
                "in_money": 2000,
                "aptitudes": {
                    "hunting.skill": 3.0
                },
                "products": {
                    "meat": 20
                },
                "onSelect": false,
                "reagents": {
                    "hide_lion": 1
                },
                "out_money": 0,
                "description": "Lion x1",
                "onLeave": false,
                "onTransform": false,
                "cost": 1,
                "location": "Raven Slaughterhouse"
            },
            "Wolf x10": {
                "in_money": 20000,
                "aptitudes": {
                    "hunting.skill": 30.0
                },
                "products": {
                    "meat": 200
                },
                "onSelect": false,
                "reagents": {
                    "hide_wolf": 10
                },
                "out_money": 0,
                "description": "Wolf x10",
                "onLeave": false,
                "onTransform": false,
                "cost": 10,
                "location": "Raven Slaughterhouse"
            },
            "Wolf x1": {
                "in_money": 2000,
                "aptitudes": {
                    "hunting.skill": 3.0
                },
                "products": {
                    "meat": 20
                },
                "onSelect": false,
                "reagents": {
                    "hide_wolf": 1
                },
                "out_money": 0,
                "description": "Wolf x1",
                "onLeave": false,
                "onTransform": false,
                "cost": 1,
                "location": "Raven Slaughterhouse"
            },
            "Coyote x1": {
                "in_money": 2000,
                "aptitudes": {
                    "hunting.skill": 0.89999999999999
                },
                "products": {
                    "meat": 6
                },
                "onSelect": false,
                "reagents": {
                    "hide_coyote": 1
                },
                "out_money": 0,
                "description": "Coyote x1",
                "onLeave": false,
                "onTransform": false,
                "cost": 1,
                "location": "Raven Slaughterhouse"
            },
            "Leopard x1": {
                "in_money": 2000,
                "aptitudes": {
                    "hunting.skill": 3.0
                },
                "products": {
                    "meat": 20
                },
                "onSelect": false,
                "reagents": {
                    "hide_leopard": 1
                },
                "out_money": 0,
                "description": "Leopard x1",
                "onLeave": false,
                "onTransform": false,
                "cost": 1,
                "location": "Raven Slaughterhouse"
            },
            "Boar x1": {
                "in_money": 2000,
                "aptitudes": {
                    "hunting.skill": 3.0
                },
                "products": {
                    "meat": 20
                },
                "onSelect": false,
                "reagents": {
                    "hide_boar": 1
                },
                "out_money": 0,
                "description": "Boar x1",
                "onLeave": false,
                "onTransform": false,
                "cost": 1,
                "location": "Raven Slaughterhouse"
            },
            "Deer x10": {
                "in_money": 20000,
                "aptitudes": {
                    "hunting.skill": 18.0
                },
                "products": {
                    "meat": 120
                },
                "onSelect": false,
                "reagents": {
                    "hide_deer": 10
                },
                "out_money": 0,
                "description": "Deer x10",
                "onLeave": false,
                "onTransform": false,
                "cost": 10,
                "location": "Raven Slaughterhouse"
            },
            "Rabbit x1": {
                "in_money": 2000,
                "aptitudes": {
                    "hunting.skill": 0.3
                },
                "products": {
                    "meat": 2
                },
                "onSelect": false,
                "reagents": {
                    "hide_rabbit": 1
                },
                "out_money": 0,
                "description": "Rabbit x1",
                "onLeave": false,
                "onTransform": false,
                "cost": 1,
                "location": "Raven Slaughterhouse"
            },
            "Coyote x10": {
                "in_money": 20000,
                "aptitudes": {
                    "hunting.skill": 9.0
                },
                "products": {
                    "meat": 60
                },
                "onSelect": false,
                "reagents": {
                    "hide_coyote": 10
                },
                "out_money": 0,
                "description": "Coyote x10",
                "onLeave": false,
                "onTransform": false,
                "cost": 10,
                "location": "Raven Slaughterhouse"
            }
        },
        "usage": {
            "Pack Meat x10": {
                "reagents": {
                    "meat": 300
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": [],
                "description": "Pack Meat",
                "products": {
                    "fridge_meat": 10
                },
                "location": "Clucking Bell Farms"
            },
            "Pack Crispy Meat x10": {
                "permissionsText": "Crispy Meat Secret",
                "in_money": 0,
                "aptitudes": [],
                "products": {
                    "fridge_meat": 10
                },
                "secret": true,
                "description": "Pack Crispy Meat x10",
                "reagents": {
                    "meat": 200,
                    "tcargodust": 20
                },
                "permissions": [
                    "sd.trucking.clucking.meat"
                ],
                "out_money": 0,
                "location": "Clucking Bell Farms"
            },
            "Pack Meat": {
                "reagents": {
                    "meat": 30
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": [],
                "description": "Pack Meat",
                "products": {
                    "fridge_meat": 1
                },
                "location": "Clucking Bell Farms"
            }
        },
        "export": {},
        "key": "meat"
    },
    "Methamphetamine": {
        "name": "Methamphetamine",
        "jobs": {
            "trucker": true
        },
        "value": 0,
        "pickuplocation": "Liquor Ace",
        "craftlocation": "",
        "usagelocation": "Humane Labs",
        "exportlocation": "",
        "permissions": "",
        "pickup": {
            "Pick up methamphetamine x10": {
                "in_money": 100000,
                "aptitudes": [],
                "products": {
                    "illegal_meth": 10
                },
                "onSelect": false,
                "reagents": [],
                "out_money": 0,
                "description": "Methamphetamine x10",
                "onLeave": false,
                "onTransform": false,
                "cost": 10,
                "location": "Liquor Ace"
            },
            "Pick up methamphetamine": {
                "in_money": 10000,
                "aptitudes": [],
                "products": {
                    "illegal_meth": 1
                },
                "onSelect": false,
                "reagents": [],
                "out_money": 0,
                "description": "Methamphetamine",
                "onLeave": false,
                "onTransform": false,
                "cost": 1,
                "location": "Liquor Ace"
            }
        },
        "crafting": {},
        "usage": {
            "Craft Pills": {
                "in_money": 100000,
                "aptitudes": {
                    "trucking.trucking": 6.0,
                    "physical.strength": 6.0,
                    "player.player": 6.0
                },
                "products": {
                    "pills": 1
                },
                "onSelect": false,
                "reagents": {
                    "illegal_meth": 8,
                    "illegal_crate": 3
                },
                "out_money": 0,
                "description": "Methamphetamine",
                "onLeave": false,
                "onTransform": false,
                "cost": 1,
                "location": "Humane Labs"
            }
        },
        "export": {},
        "key": "illegal_meth"
    },
    "Mining Token Copper": {
        "name": "Mining Token Copper",
        "jobs": {
            "trucker": true
        },
        "value": 0,
        "pickuplocation": "",
        "craftlocation": "",
        "usagelocation": "Elysian Island Waste Deposit",
        "exportlocation": "",
        "permissions": "",
        "pickup": {},
        "crafting": {},
        "usage": {
            "<span sort='C'></span>Exchange Copper": {
                "reagents": {
                    "mining_token_copper": 1
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": [],
                "description": "Exchange Copper",
                "products": {
                    "scrap_ore": 1
                },
                "location": "Elysian Island Waste Deposit"
            },
            "<span sort='D'></span>Exchange Copper x10": {
                "reagents": {
                    "mining_token_copper": 10
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": [],
                "description": "Exchange Copper x10",
                "products": {
                    "scrap_ore": 10
                },
                "location": "Elysian Island Waste Deposit"
            }
        },
        "export": {},
        "key": "mining_token_copper"
    },
    "Mining Token Iron": {
        "name": "Mining Token Iron",
        "jobs": {
            "trucker": true
        },
        "value": 0,
        "pickuplocation": "",
        "craftlocation": "",
        "usagelocation": "Elysian Island Waste Deposit",
        "exportlocation": "",
        "permissions": "",
        "pickup": {},
        "crafting": {},
        "usage": {
            "<span sort='F'></span>Exchange Iron x10": {
                "reagents": {
                    "mining_token_iron": 10
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": [],
                "description": "Exchange Iron x10",
                "products": {
                    "scrap_ore": 10
                },
                "location": "Elysian Island Waste Deposit"
            },
            "<span sort='E'></span>Exchange Iron": {
                "reagents": {
                    "mining_token_iron": 1
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": [],
                "description": "Exchange Iron",
                "products": {
                    "scrap_ore": 1
                },
                "location": "Elysian Island Waste Deposit"
            }
        },
        "export": {},
        "key": "mining_token_iron"
    },
    "Petrol": {
        "name": "Petrol",
        "jobs": {
            "trucker": true,
            "petrochem": true
        },
        "value": 8000,
        "pickuplocation": "",
        "craftlocation": "Refinery",
        "usagelocation": "LS Foundry",
        "exportlocation": "Bristols Fuel Storage",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Refine Rubber": {
                "reagents": {
                    "petrochem_oil": 4
                },
                "out_money": 0,
                "in_money": 41000,
                "aptitudes": [],
                "description": "Refine Rubber",
                "products": {
                    "mechanicals_rubber": 4,
                    "petrochem_diesel": 2,
                    "petrochem_petrol": 4,
                    "petrochem_kerosene": 2
                },
                "location": "Refinery"
            },
            "Refine Crude Oil x2": {
                "reagents": {
                    "petrochem_oil": 2
                },
                "out_money": 0,
                "in_money": 20500,
                "aptitudes": {
                    "trucking.trucking": 12.9,
                    "physical.strength": 12.9,
                    "player.player": 12.9
                },
                "description": "Refine Crude Oil x2",
                "products": {
                    "petrochem_diesel": 2,
                    "petrochem_petrol": 4,
                    "petrochem_kerosene": 2
                },
                "location": "Refinery"
            },
            "Refine Diluted Fuel": {
                "permissionsText": "Diluted Fuel Refining Secret",
                "in_money": 10250,
                "aptitudes": {
                    "trucking.trucking": 8.81,
                    "physical.strength": 8.81,
                    "player.player": 8.81
                },
                "products": {
                    "petrochem_diesel": 3,
                    "petrochem_petrol": 3,
                    "petrochem_kerosene": 20
                },
                "secret": true,
                "description": "Refine Diluted Fuel",
                "reagents": {
                    "petrochem_oil": 3,
                    "liquid_water": 2
                },
                "permissions": [
                    "sd.trucking.dilutedfuel"
                ],
                "out_money": 0,
                "location": "Refinery"
            },
            "Refine Crude Oil": {
                "reagents": {
                    "petrochem_oil": 1
                },
                "out_money": 0,
                "in_money": 10250,
                "aptitudes": {
                    "trucking.trucking": 6.45,
                    "physical.strength": 6.45,
                    "player.player": 6.45
                },
                "description": "Refine Crude Oil",
                "products": {
                    "petrochem_diesel": 1,
                    "petrochem_petrol": 2,
                    "petrochem_kerosene": 1
                },
                "location": "Refinery"
            }
        },
        "usage": {
            "Substitute Gold": {
                "permissionsText": "Substitute Gold Secret",
                "in_money": 1000,
                "aptitudes": {
                    "trucking.trucking": 10.0,
                    "physical.strength": 10.0,
                    "player.player": 10.0
                },
                "products": {
                    "scrap_gold": 40
                },
                "secret": true,
                "description": "Substitute Gold",
                "reagents": {
                    "petrochem_petrol": 2,
                    "petrochem_sulfur": 10,
                    "refined_bronze": 25
                },
                "permissions": [
                    "sd.trucking.foundry.gold"
                ],
                "out_money": 0,
                "location": "LS Foundry"
            },
            "Fill Petrol Cans": {
                "reagents": {
                    "petrochem_petrol": 1
                },
                "out_money": 4000,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 1.9,
                    "physical.strength": 1.9,
                    "player.player": 1.9
                },
                "description": "Fill Petrol Cans",
                "products": {
                    "jerry_can|DIESEL|Petrol": 10
                },
                "location": "Oil Depository"
            }
        },
        "export": {
            "Sell Petrol": {
                "reagents": {
                    "petrochem_petrol": 1
                },
                "out_money": 8000,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 0.39,
                    "physical.strength": 0.39,
                    "player.player": 0.39
                },
                "description": "Sell Petrol",
                "products": [],
                "location": "Bristols Fuel Storage"
            },
            "Sell Petrol x10": {
                "reagents": {
                    "petrochem_petrol": 10
                },
                "out_money": 80000,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 3.9,
                    "physical.strength": 3.9,
                    "player.player": 3.9
                },
                "description": "Sell Petrol",
                "products": [],
                "location": "Bristols Fuel Storage"
            }
        },
        "key": "petrochem_petrol"
    },
    "Petrol Fuel": {
        "name": "Petrol Fuel",
        "jobs": {
            "petrochem": true
        },
        "value": 0,
        "pickuplocation": "",
        "craftlocation": "Oil Depository",
        "usagelocation": "",
        "exportlocation": "",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Fill Petrol Cans": {
                "reagents": {
                    "petrochem_petrol": 1
                },
                "out_money": 4000,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 1.9,
                    "physical.strength": 1.9,
                    "player.player": 1.9
                },
                "description": "Fill Petrol Cans",
                "products": {
                    "jerry_can|DIESEL|Petrol": 10
                },
                "location": "Oil Depository"
            }
        },
        "usage": {},
        "export": {},
        "key": "jerry_can|DIESEL|Petrol"
    },
    "Pills": {
        "name": "Pills",
        "jobs": {
            "trucker": true
        },
        "value": 0,
        "pickuplocation": "",
        "craftlocation": "Humane Labs",
        "usagelocation": "",
        "exportlocation": "",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Craft Pills": {
                "in_money": 100000,
                "aptitudes": {
                    "trucking.trucking": 6.0,
                    "physical.strength": 6.0,
                    "player.player": 6.0
                },
                "products": {
                    "pills": 1
                },
                "onSelect": false,
                "reagents": {
                    "illegal_meth": 8,
                    "illegal_crate": 3
                },
                "out_money": 0,
                "description": "Methamphetamine",
                "onLeave": false,
                "onTransform": false,
                "cost": 1,
                "location": "Humane Labs"
            }
        },
        "usage": {},
        "export": {},
        "key": "pills"
    },
    "Pills Crate": {
        "name": "Pills Crate",
        "jobs": {
            "trucker": true
        },
        "value": 0,
        "pickuplocation": "",
        "craftlocation": "Pop's Pills ",
        "usagelocation": "Humane Labs",
        "exportlocation": "",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Pick up pills crate x10": {
                "in_money": 100000,
                "aptitudes": [],
                "products": {
                    "illegal_crate": 10
                },
                "onSelect": false,
                "reagents": {
                    "refined_planks": 10,
                    "scrap_plastic": 50
                },
                "out_money": 0,
                "description": "Pills Crate x10",
                "onLeave": false,
                "onTransform": false,
                "cost": 10,
                "location": "Pop's Pills "
            },
            "Pick up pills crate": {
                "in_money": 10000,
                "aptitudes": [],
                "products": {
                    "illegal_crate": 1
                },
                "onSelect": false,
                "reagents": {
                    "refined_planks": 1,
                    "scrap_plastic": 5
                },
                "out_money": 0,
                "description": "Pills Crate",
                "onLeave": false,
                "onTransform": false,
                "cost": 1,
                "location": "Pop's Pills "
            }
        },
        "usage": {
            "Craft Pills": {
                "in_money": 100000,
                "aptitudes": {
                    "trucking.trucking": 6.0,
                    "physical.strength": 6.0,
                    "player.player": 6.0
                },
                "products": {
                    "pills": 1
                },
                "onSelect": false,
                "reagents": {
                    "illegal_meth": 8,
                    "illegal_crate": 3
                },
                "out_money": 0,
                "description": "Methamphetamine",
                "onLeave": false,
                "onTransform": false,
                "cost": 1,
                "location": "Humane Labs"
            }
        },
        "export": {},
        "key": "illegal_crate"
    },
    "Plane Fuel": {
        "name": "Plane Fuel",
        "jobs": {
            "petrochem": true
        },
        "value": 0,
        "pickuplocation": "",
        "craftlocation": "Oil Depository",
        "usagelocation": "",
        "exportlocation": "",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Fill Plane Cans": {
                "reagents": {
                    "petrochem_kerosene": 1
                },
                "out_money": 11000,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 1.9,
                    "physical.strength": 1.9,
                    "player.player": 1.9
                },
                "description": "Fill Plane Cans",
                "products": {
                    "jerry_can|PLANE|Plane": 10
                },
                "location": "Oil Depository"
            }
        },
        "usage": {},
        "export": {},
        "key": "jerry_can|PLANE|Plane"
    },
    "Planks": {
        "name": "Planks",
        "jobs": {
            "trucker": true
        },
        "value": 14400,
        "pickuplocation": "",
        "craftlocation": "Sawmill",
        "usagelocation": "LS Factory",
        "exportlocation": "House Construction Site",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Mill Planks x1": {
                "reagents": {
                    "tcargologs": 1
                },
                "out_money": 0,
                "in_money": 500,
                "aptitudes": {
                    "trucking.trucking": 3.63,
                    "physical.strength": 3.63,
                    "player.player": 3.63
                },
                "description": "Make high quality planks out of the logs",
                "products": {
                    "refined_planks": 1,
                    "tcargodust": 2
                },
                "location": "Sawmill"
            },
            "Mill Planks x5": {
                "reagents": {
                    "tcargologs": 5
                },
                "out_money": 0,
                "in_money": 2500,
                "aptitudes": {
                    "trucking.trucking": 18.15,
                    "physical.strength": 18.15,
                    "player.player": 18.15
                },
                "description": "Make high quality planks out of the bulk of 5 logs",
                "products": {
                    "refined_planks": 5,
                    "tcargodust": 10
                },
                "location": "Sawmill"
            },
            "Chipboard Planks": {
                "permissionsText": "Chipboard Planks Secret",
                "in_money": 2500,
                "aptitudes": {
                    "trucking.trucking": 18.15,
                    "physical.strength": 18.15,
                    "player.player": 18.15
                },
                "products": {
                    "refined_planks": 15
                },
                "secret": true,
                "description": "Make high quality planks out of the bulk of 5 logs",
                "reagents": {
                    "tcargodust": 30,
                    "tcargologs": 5
                },
                "permissions": [
                    "sd.trucking.sawmill.plank"
                ],
                "out_money": 0,
                "location": "Sawmill"
            }
        },
        "usage": {
            "Create Fiberglass Spool": {
                "reagents": {
                    "refined_planks": 1,
                    "scrap_plastic": 8,
                    "refined_glass": 4
                },
                "out_money": 0,
                "in_money": 5000,
                "aptitudes": {
                    "trucking.trucking": 1.81,
                    "physical.strength": 1.81,
                    "player.player": 1.81
                },
                "description": "Create spools of fiberglass",
                "products": {
                    "crafted_fiberglass": 2
                },
                "location": "LS Factory"
            },
            "Create Copper Wire Spool x5": {
                "reagents": {
                    "refined_planks": 5,
                    "refined_copper": 20
                },
                "out_money": 0,
                "in_money": 25000,
                "aptitudes": {
                    "trucking.trucking": 14.5,
                    "physical.strength": 14.5,
                    "player.player": 14.5
                },
                "description": "Create spools of copper wire",
                "products": {
                    "crafted_copperwire": 10
                },
                "location": "LS Factory"
            },
            "Create Fiberglass Spool x10": {
                "reagents": {
                    "refined_planks": 10,
                    "scrap_plastic": 80,
                    "refined_glass": 40
                },
                "out_money": 0,
                "in_money": 50000,
                "aptitudes": {
                    "trucking.trucking": 18.1,
                    "physical.strength": 18.1,
                    "player.player": 18.1
                },
                "description": "Create spools of fiberglass",
                "products": {
                    "crafted_fiberglass": 20
                },
                "location": "LS Factory"
            },
            "Create Copper Wire Spool": {
                "reagents": {
                    "refined_planks": 1,
                    "refined_copper": 4
                },
                "out_money": 0,
                "in_money": 5000,
                "aptitudes": {
                    "trucking.trucking": 2.9,
                    "physical.strength": 2.9,
                    "player.player": 2.9
                },
                "description": "Create spools of copper wire",
                "products": {
                    "crafted_copperwire": 2
                },
                "location": "LS Factory"
            },
            "Pick up pills crate x10": {
                "in_money": 100000,
                "aptitudes": [],
                "products": {
                    "illegal_crate": 10
                },
                "onSelect": false,
                "reagents": {
                    "refined_planks": 10,
                    "scrap_plastic": 50
                },
                "out_money": 0,
                "description": "Pills Crate x10",
                "onLeave": false,
                "onTransform": false,
                "cost": 10,
                "location": "Pop's Pills "
            },
            "Pick up pills crate": {
                "in_money": 10000,
                "aptitudes": [],
                "products": {
                    "illegal_crate": 1
                },
                "onSelect": false,
                "reagents": {
                    "refined_planks": 1,
                    "scrap_plastic": 5
                },
                "out_money": 0,
                "description": "Pills Crate",
                "onLeave": false,
                "onTransform": false,
                "cost": 1,
                "location": "Pop's Pills "
            }
        },
        "export": {
            "House Construction": {
                "reagents": {
                    "refined_planks": 2,
                    "crafted_concrete": 1,
                    "crafted_ceramictiles": 4,
                    "crafted_copperwire": 1,
                    "crafted_computer": 1,
                    "crafted_rebar": 1
                },
                "description": "Construct a House",
                "out_money": 2350000,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 87.49,
                    "physical.strength": 87.49,
                    "player.player": 87.49
                },
                "products": [],
                "location": "House Construction Site"
            },
            "Export Planks x1": {
                "reagents": {
                    "refined_planks": 1
                },
                "out_money": 14400,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 0.25,
                    "physical.strength": 0.25,
                    "player.player": 0.25
                },
                "description": "Export planks",
                "products": [],
                "location": "LS Port Export"
            },
            "Export Planks x10": {
                "reagents": {
                    "refined_planks": 10
                },
                "out_money": 144000,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 2.5,
                    "physical.strength": 2.5,
                    "player.player": 2.5
                },
                "description": "Export planks in bulks of 10",
                "products": [],
                "location": "LS Port Export"
            }
        },
        "key": "refined_planks"
    },
    "Propane": {
        "name": "Propane",
        "jobs": {
            "trucker": true,
            "petrochem": true
        },
        "value": 10000,
        "pickuplocation": "",
        "craftlocation": "Refinery",
        "usagelocation": "LS Foundry",
        "exportlocation": "Davis Mega Mall",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Refine Raw Gas x2": {
                "reagents": {
                    "petrochem_gas": 2
                },
                "out_money": 0,
                "in_money": 20500,
                "aptitudes": {
                    "trucking.trucking": 12.64,
                    "physical.strength": 12.64,
                    "player.player": 12.64
                },
                "description": "Refine Raw Gas x2",
                "products": {
                    "petrochem_propane": 4,
                    "military_chemicals": 4,
                    "petrochem_waste": 2
                },
                "location": "Refinery"
            },
            "Refine Raw Gas": {
                "reagents": {
                    "petrochem_gas": 1
                },
                "out_money": 0,
                "in_money": 10250,
                "aptitudes": {
                    "trucking.trucking": 6.32,
                    "physical.strength": 6.32,
                    "player.player": 6.32
                },
                "description": "Refine Raw Gas",
                "products": {
                    "petrochem_propane": 2,
                    "military_chemicals": 2,
                    "petrochem_waste": 1
                },
                "location": "Refinery"
            }
        },
        "usage": {
            "Zinc Alloy": {
                "permissionsText": "Zinc Alloy Secret",
                "in_money": 10000,
                "aptitudes": {
                    "trucking.trucking": 10.0,
                    "physical.strength": 10.0,
                    "player.player": 10.0
                },
                "products": {
                    "refined_zinc": 20
                },
                "secret": true,
                "description": "Zinc Alloy",
                "reagents": {
                    "petrochem_propane": 2,
                    "scrap_ore": 20
                },
                "permissions": [
                    "sd.trucking.foundry.zinc"
                ],
                "out_money": 0,
                "location": "LS Foundry"
            }
        },
        "export": {
            "Sell Propane x10": {
                "reagents": {
                    "petrochem_propane": 10
                },
                "out_money": 100000,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 0.72,
                    "physical.strength": 0.72,
                    "player.player": 0.72
                },
                "description": "Sell Propane",
                "products": [],
                "location": "Davis Mega Mall"
            },
            "Sell Propane": {
                "reagents": {
                    "petrochem_propane": 1
                },
                "out_money": 10000,
                "in_money": 0,
                "aptitudes": [],
                "description": "Sell Propane",
                "products": [],
                "location": "Davis Mega Mall"
            }
        },
        "key": "petrochem_propane"
    },
    "Quarry Rubble": {
        "name": "Quarry Rubble",
        "jobs": {
            "trucker": true
        },
        "value": 0,
        "pickuplocation": "Quarry",
        "craftlocation": "",
        "usagelocation": "Filtering Plant",
        "exportlocation": "",
        "permissions": "",
        "pickup": {
            "Pick up Quarry Rubble x2": {
                "reagents": [],
                "out_money": 0,
                "in_money": 0,
                "aptitudes": [],
                "description": "Pick up Quarry Rubble, bring it to a filtering facility.",
                "products": {
                    "recycled_rubble": 2
                },
                "location": "Quarry"
            },
            "Pick up Quarry Rubble": {
                "reagents": [],
                "out_money": 0,
                "in_money": 0,
                "aptitudes": [],
                "description": "Pick up Quarry Rubble, bring it to a filtering facility.",
                "products": {
                    "recycled_rubble": 1
                },
                "location": "Quarry"
            }
        },
        "crafting": {},
        "usage": {
            "Filter Quarry Rubble": {
                "reagents": {
                    "recycled_rubble": 1
                },
                "out_money": 0,
                "in_money": 15000,
                "aptitudes": {
                    "trucking.trucking": 2.45,
                    "physical.strength": 2.45,
                    "player.player": 2.45
                },
                "description": "Filter materials out of the rubble.",
                "products": {
                    "scrap_ore": 4,
                    "scrap_gravel": 12,
                    "scrap_emerald": 1
                },
                "location": "Filtering Plant"
            },
            "Filter Quarry Rubble x2": {
                "reagents": {
                    "recycled_rubble": 2
                },
                "out_money": 0,
                "in_money": 30000,
                "aptitudes": {
                    "trucking.trucking": 4.9,
                    "physical.strength": 4.9,
                    "player.player": 4.9
                },
                "description": "Filter materials out of the rubble.",
                "products": {
                    "scrap_ore": 8,
                    "scrap_gravel": 24,
                    "scrap_emerald": 2
                },
                "location": "Filtering Plant"
            }
        },
        "export": {},
        "key": "recycled_rubble"
    },
    "Rainbow Voucher": {
        "name": "Rainbow Voucher",
        "jobs": {
            "liberty": true
        },
        "value": 0,
        "pickuplocation": "",
        "craftlocation": "Rooftop",
        "usagelocation": "",
        "exportlocation": "",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Trade for Rainbow Voucher": {
                "reagents": {
                    "liberty_voucher_portland": 1,
                    "liberty_voucher_shoreside": 1,
                    "liberty_voucher_staunton": 1,
                    "liberty_voucher_islands": 1
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": [],
                "description": "Rainbow Voucher",
                "products": {
                    "rainbow_voucher": 1
                },
                "location": "Rooftop"
            }
        },
        "usage": {},
        "export": {},
        "key": "rainbow_voucher"
    },
    "Raw Emeralds": {
        "name": "Raw Emeralds",
        "jobs": {
            "trucker": true
        },
        "value": 25000,
        "pickuplocation": "",
        "craftlocation": "Filtering Plant",
        "usagelocation": "LS Factory",
        "exportlocation": "Jewelry Store",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Filter Quarry Rubble": {
                "reagents": {
                    "recycled_rubble": 1
                },
                "out_money": 0,
                "in_money": 15000,
                "aptitudes": {
                    "trucking.trucking": 2.45,
                    "physical.strength": 2.45,
                    "player.player": 2.45
                },
                "description": "Filter materials out of the rubble.",
                "products": {
                    "scrap_ore": 4,
                    "scrap_gravel": 12,
                    "scrap_emerald": 1
                },
                "location": "Filtering Plant"
            },
            "Filter Quarry Rubble x2": {
                "reagents": {
                    "recycled_rubble": 2
                },
                "out_money": 0,
                "in_money": 30000,
                "aptitudes": {
                    "trucking.trucking": 4.9,
                    "physical.strength": 4.9,
                    "player.player": 4.9
                },
                "description": "Filter materials out of the rubble.",
                "products": {
                    "scrap_ore": 8,
                    "scrap_gravel": 24,
                    "scrap_emerald": 2
                },
                "location": "Filtering Plant"
            }
        },
        "usage": {
            "Create Jewelry": {
                "reagents": {
                    "scrap_emerald": 1,
                    "refined_gold": 2
                },
                "out_money": 0,
                "in_money": 5000,
                "aptitudes": {
                    "trucking.trucking": 2.8,
                    "physical.strength": 2.8,
                    "player.player": 2.8
                },
                "description": "Combine valuable items into even more valuable jewelry.",
                "products": {
                    "crafted_jewelry": 2
                },
                "location": "LS Factory"
            }
        },
        "export": {
            "Deliver Raw Emeralds x10": {
                "reagents": {
                    "scrap_emerald": 10
                },
                "out_money": 250000,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 3.2,
                    "physical.strength": 3.2,
                    "player.player": 3.2
                },
                "description": "Deliver raw emeralds",
                "products": [],
                "location": "Jewelry Store"
            },
            "Deliver Raw Emeralds": {
                "reagents": {
                    "scrap_emerald": 1
                },
                "out_money": 25000,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 0.32,
                    "physical.strength": 0.32,
                    "player.player": 0.32
                },
                "description": "Deliver raw emeralds",
                "products": [],
                "location": "Jewelry Store"
            }
        },
        "key": "scrap_emerald"
    },
    "Raw Gas": {
        "name": "Raw Gas",
        "jobs": {
            "petrochem": true
        },
        "value": 0,
        "pickuplocation": "GSD Gas Pumping Station",
        "craftlocation": "",
        "usagelocation": "Refinery",
        "exportlocation": "",
        "permissions": "",
        "pickup": {
            "Extract Raw Gas": {
                "reagents": [],
                "out_money": 0,
                "in_money": 0,
                "aptitudes": [],
                "description": "Extract Raw Gas",
                "products": {
                    "petrochem_gas": 1
                },
                "location": "GSD Gas Pumping Station"
            },
            "Extract Raw Gas x2": {
                "reagents": [],
                "out_money": 0,
                "in_money": 0,
                "aptitudes": [],
                "description": "Extract Raw Gas x2",
                "products": {
                    "petrochem_gas": 2
                },
                "location": "GSD Gas Pumping Station"
            }
        },
        "crafting": {},
        "usage": {
            "Refine Raw Gas x2": {
                "reagents": {
                    "petrochem_gas": 2
                },
                "out_money": 0,
                "in_money": 20500,
                "aptitudes": {
                    "trucking.trucking": 12.64,
                    "physical.strength": 12.64,
                    "player.player": 12.64
                },
                "description": "Refine Raw Gas x2",
                "products": {
                    "petrochem_propane": 4,
                    "military_chemicals": 4,
                    "petrochem_waste": 2
                },
                "location": "Refinery"
            },
            "Refine Raw Gas": {
                "reagents": {
                    "petrochem_gas": 1
                },
                "out_money": 0,
                "in_money": 10250,
                "aptitudes": {
                    "trucking.trucking": 6.32,
                    "physical.strength": 6.32,
                    "player.player": 6.32
                },
                "description": "Refine Raw Gas",
                "products": {
                    "petrochem_propane": 2,
                    "military_chemicals": 2,
                    "petrochem_waste": 1
                },
                "location": "Refinery"
            }
        },
        "export": {},
        "key": "petrochem_gas"
    },
    "Raw Ore Mix": {
        "name": "Raw Ore Mix",
        "jobs": {
            "military": true,
            "trucker": true
        },
        "value": 0,
        "pickuplocation": "",
        "craftlocation": "Filtering Plant",
        "usagelocation": "Deep Quarry",
        "exportlocation": "",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Filter Quarry Rubble": {
                "reagents": {
                    "recycled_rubble": 1
                },
                "out_money": 0,
                "in_money": 15000,
                "aptitudes": {
                    "trucking.trucking": 2.45,
                    "physical.strength": 2.45,
                    "player.player": 2.45
                },
                "description": "Filter materials out of the rubble.",
                "products": {
                    "scrap_ore": 4,
                    "scrap_gravel": 12,
                    "scrap_emerald": 1
                },
                "location": "Filtering Plant"
            },
            "Filter Quarry Rubble x2": {
                "reagents": {
                    "recycled_rubble": 2
                },
                "out_money": 0,
                "in_money": 30000,
                "aptitudes": {
                    "trucking.trucking": 4.9,
                    "physical.strength": 4.9,
                    "player.player": 4.9
                },
                "description": "Filter materials out of the rubble.",
                "products": {
                    "scrap_ore": 8,
                    "scrap_gravel": 24,
                    "scrap_emerald": 2
                },
                "location": "Filtering Plant"
            },
            "<span sort='C'></span>Exchange Copper": {
                "reagents": {
                    "mining_token_copper": 1
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": [],
                "description": "Exchange Copper",
                "products": {
                    "scrap_ore": 1
                },
                "location": "Elysian Island Waste Deposit"
            },
            "<span sort='D'></span>Exchange Copper x10": {
                "reagents": {
                    "mining_token_copper": 10
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": [],
                "description": "Exchange Copper x10",
                "products": {
                    "scrap_ore": 10
                },
                "location": "Elysian Island Waste Deposit"
            },
            "<span sort='F'></span>Exchange Iron x10": {
                "reagents": {
                    "mining_token_iron": 10
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": [],
                "description": "Exchange Iron x10",
                "products": {
                    "scrap_ore": 10
                },
                "location": "Elysian Island Waste Deposit"
            },
            "<span sort='E'></span>Exchange Iron": {
                "reagents": {
                    "mining_token_iron": 1
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": [],
                "description": "Exchange Iron",
                "products": {
                    "scrap_ore": 1
                },
                "location": "Elysian Island Waste Deposit"
            }
        },
        "usage": {
            "Recycle Ore Mix": {
                "permissionsText": "Ore Mix Recycling Secret",
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 13.35,
                    "physical.strength": 13.35,
                    "player.player": 13.35
                },
                "products": {
                    "refined_sand": 90
                },
                "secret": true,
                "description": "Recycle Ore Mix",
                "reagents": {
                    "military_explosives": 1,
                    "scrap_ore": 15
                },
                "permissions": [
                    "sd.trucking.quarry.ore"
                ],
                "out_money": 0,
                "location": "Deep Quarry"
            },
            "Zinc Alloy": {
                "permissionsText": "Zinc Alloy Secret",
                "in_money": 10000,
                "aptitudes": {
                    "trucking.trucking": 10.0,
                    "physical.strength": 10.0,
                    "player.player": 10.0
                },
                "products": {
                    "refined_zinc": 20
                },
                "secret": true,
                "description": "Zinc Alloy",
                "reagents": {
                    "petrochem_propane": 2,
                    "scrap_ore": 20
                },
                "permissions": [
                    "sd.trucking.foundry.zinc"
                ],
                "out_money": 0,
                "location": "LS Foundry"
            },
            "Refine Raw Ore Mix x10": {
                "reagents": {
                    "scrap_ore": 20
                },
                "out_money": 0,
                "in_money": 10000,
                "aptitudes": {
                    "trucking.trucking": 10.9,
                    "physical.strength": 10.9,
                    "player.player": 10.9
                },
                "description": "Smelt down and separate different metals from the raw ore mix",
                "products": {
                    "refined_copper": 10,
                    "refined_zinc": 10
                },
                "location": "LS Foundry"
            },
            "Refine Raw Ore Mix x1": {
                "reagents": {
                    "scrap_ore": 2
                },
                "out_money": 0,
                "in_money": 1000,
                "aptitudes": {
                    "trucking.trucking": 1.09,
                    "physical.strength": 1.09,
                    "player.player": 1.09
                },
                "description": "Smelt down and separate different metals from the raw ore mix",
                "products": {
                    "refined_copper": 1,
                    "refined_zinc": 1
                },
                "location": "LS Foundry"
            },
            "Copper Alloy": {
                "permissionsText": "Copper Alloy Secret",
                "in_money": 10000,
                "aptitudes": {
                    "trucking.trucking": 10.0,
                    "physical.strength": 10.0,
                    "player.player": 10.0
                },
                "products": {
                    "refined_copper": 20
                },
                "secret": true,
                "description": "Copper Alloy",
                "reagents": {
                    "petrochem_sulfur": 10,
                    "scrap_ore": 20
                },
                "permissions": [
                    "sd.trucking.foundry.copper"
                ],
                "out_money": 0,
                "location": "LS Foundry"
            }
        },
        "export": {},
        "key": "scrap_ore"
    },
    "Rebar": {
        "name": "Rebar",
        "jobs": {
            "trucker": true
        },
        "value": 230000,
        "pickuplocation": "",
        "craftlocation": "LS Factory",
        "usagelocation": "",
        "exportlocation": "Alta Construction Site",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Titanium Reinforcement": {
                "permissionsText": "Titanium Reinforcement Secret",
                "in_money": 5000,
                "aptitudes": {
                    "trucking.trucking": 4.79,
                    "physical.strength": 4.79,
                    "player.player": 4.79
                },
                "products": {
                    "crafted_rebar": 2
                },
                "secret": true,
                "description": "Clean Waste Water",
                "reagents": {
                    "military_titanium": 6
                },
                "permissions": [
                    "sd.trucking.factory.titanium"
                ],
                "out_money": 0,
                "location": "LS Factory"
            },
            "Create Rebar": {
                "reagents": {
                    "refined_bronze": 2,
                    "refined_amalgam": 6
                },
                "out_money": 0,
                "in_money": 5000,
                "aptitudes": {
                    "trucking.trucking": 4.79,
                    "physical.strength": 4.79,
                    "player.player": 4.79
                },
                "description": "Create a shipment of rebar",
                "products": {
                    "crafted_rebar": 2
                },
                "location": "LS Factory"
            },
            "Create Rebar x2": {
                "reagents": {
                    "refined_bronze": 4,
                    "refined_amalgam": 12
                },
                "out_money": 0,
                "in_money": 10000,
                "aptitudes": {
                    "trucking.trucking": 9.58,
                    "physical.strength": 9.58,
                    "player.player": 9.58
                },
                "description": "Create a shipment of rebar",
                "products": {
                    "crafted_rebar": 4
                },
                "location": "LS Factory"
            }
        },
        "usage": {},
        "export": {
            "Deliver Rebar": {
                "reagents": {
                    "crafted_rebar": 1
                },
                "out_money": 230000,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 2.03,
                    "physical.strength": 2.03,
                    "player.player": 2.03
                },
                "description": "Deliver Rebar to the construction site",
                "products": [],
                "location": "Alta Construction Site"
            },
            "Deliver Rebar x5": {
                "reagents": {
                    "crafted_rebar": 5
                },
                "out_money": 1150000,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 10.14999999999999,
                    "physical.strength": 10.14999999999999,
                    "player.player": 10.14999999999999
                },
                "description": "Deliver Rebar to the construction site",
                "products": [],
                "location": "Alta Construction Site"
            },
            "House Construction": {
                "reagents": {
                    "refined_planks": 2,
                    "crafted_concrete": 1,
                    "crafted_ceramictiles": 4,
                    "crafted_copperwire": 1,
                    "crafted_computer": 1,
                    "crafted_rebar": 1
                },
                "description": "Construct a House",
                "out_money": 2350000,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 87.49,
                    "physical.strength": 87.49,
                    "player.player": 87.49
                },
                "products": [],
                "location": "House Construction Site"
            }
        },
        "key": "crafted_rebar"
    },
    "Recycled Electronics": {
        "name": "Recycled Electronics",
        "jobs": {
            "trucker": true
        },
        "value": 0,
        "pickuplocation": "Electronics Store",
        "craftlocation": "",
        "usagelocation": "Sorting Facility",
        "exportlocation": "",
        "permissions": "",
        "pickup": {
            "<span sort='B'></span>Pick up Recycled Electronics x2": {
                "reagents": [],
                "description": "Pick up Recycled Electronics, bring it to the sorting facility.",
                "out_money": 0,
                "in_money": 0,
                "aptitudes": [],
                "permissions": [],
                "products": {
                    "recycled_electronics": 2
                },
                "location": "Electronics Store"
            },
            "<span sort='A'></span>Pick up Recycled Electronics": {
                "reagents": [],
                "description": "Pick up Recycled Electronics, bring it to the sorting facility.",
                "out_money": 0,
                "in_money": 0,
                "aptitudes": [],
                "permissions": [],
                "products": {
                    "recycled_electronics": 1
                },
                "location": "Electronics Store"
            }
        },
        "crafting": {},
        "usage": {
            "Sort Recycled Electronics x2": {
                "reagents": {
                    "recycled_electronics": 2
                },
                "out_money": 0,
                "in_money": 50000,
                "aptitudes": {
                    "trucking.trucking": 6.02,
                    "physical.strength": 6.02,
                    "player.player": 6.02
                },
                "description": "Break down your recycled components",
                "products": {
                    "scrap_plastic": 24,
                    "scrap_copper": 16,
                    "scrap_gold": 2
                },
                "location": "Sorting Facility"
            },
            "Sort Recycled Electronics": {
                "reagents": {
                    "recycled_electronics": 1
                },
                "out_money": 0,
                "in_money": 25000,
                "aptitudes": {
                    "trucking.trucking": 3.01,
                    "physical.strength": 3.01,
                    "player.player": 3.01
                },
                "description": "Break down your recycled components",
                "products": {
                    "scrap_plastic": 12,
                    "scrap_copper": 8,
                    "scrap_gold": 1
                },
                "location": "Sorting Facility"
            }
        },
        "export": {},
        "key": "recycled_electronics"
    },
    "Recycled Trash": {
        "name": "Recycled Trash",
        "jobs": {
            "trucker": true
        },
        "value": 0,
        "pickuplocation": "Recycling Center",
        "craftlocation": "",
        "usagelocation": "Sorting Facility",
        "exportlocation": "",
        "permissions": "",
        "pickup": {
            "Pick up Recycled Trash x3": {
                "reagents": [],
                "out_money": 0,
                "in_money": 0,
                "aptitudes": [],
                "description": "Pick up Recycled Trash, bring it to the sorting facility.",
                "products": {
                    "recycled_trash": 3
                },
                "location": "Recycling Center"
            },
            "Pick up Recycled Trash": {
                "reagents": [],
                "out_money": 0,
                "in_money": 0,
                "aptitudes": [],
                "description": "Pick up Recycled Trash, bring it to the sorting facility.",
                "products": {
                    "recycled_trash": 1
                },
                "location": "Recycling Center"
            }
        },
        "crafting": {},
        "usage": {
            "Sort Recycled Trash x3": {
                "reagents": {
                    "recycled_trash": 3
                },
                "out_money": 0,
                "in_money": 75000,
                "aptitudes": {
                    "trucking.trucking": 9.81,
                    "physical.strength": 9.81,
                    "player.player": 9.81
                },
                "description": "Break down your recycled components",
                "products": {
                    "scrap_plastic": 24,
                    "scrap_aluminum": 12,
                    "scrap_tin": 12
                },
                "location": "Sorting Facility"
            },
            "Sort Recycled Trash": {
                "reagents": {
                    "recycled_trash": 1
                },
                "out_money": 0,
                "in_money": 25000,
                "aptitudes": {
                    "trucking.trucking": 3.27,
                    "physical.strength": 3.27,
                    "player.player": 3.27
                },
                "description": "Break down your recycled components",
                "products": {
                    "scrap_plastic": 8,
                    "scrap_aluminum": 4,
                    "scrap_tin": 4
                },
                "location": "Sorting Facility"
            }
        },
        "export": {},
        "key": "recycled_trash"
    },
    "Refined Aluminum": {
        "name": "Refined Aluminum",
        "jobs": {
            "trucker": true,
            "premium.trucking": true
        },
        "value": 8400,
        "pickuplocation": "",
        "craftlocation": "LS Foundry",
        "usagelocation": "LS Foundry",
        "exportlocation": "LS Port Export",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Refine Aluminum x1": {
                "reagents": {
                    "scrap_aluminum": 2
                },
                "out_money": 0,
                "in_money": 1000,
                "aptitudes": {
                    "trucking.trucking": 0.33,
                    "physical.strength": 0.33,
                    "player.player": 0.33
                },
                "description": "Refine scrap aluminum into refined aluminum",
                "products": {
                    "refined_aluminum": 1
                },
                "location": "LS Foundry"
            },
            "Refine Aluminum x10": {
                "reagents": {
                    "scrap_aluminum": 20
                },
                "out_money": 0,
                "in_money": 10000,
                "aptitudes": {
                    "trucking.trucking": 3.3,
                    "physical.strength": 3.3,
                    "player.player": 3.3
                },
                "description": "Refine scrap aluminum into refined aluminum",
                "products": {
                    "refined_aluminum": 10
                },
                "location": "LS Foundry"
            }
        },
        "usage": {
            "Refine Solder": {
                "reagents": {
                    "scrap_lead": 2,
                    "refined_aluminum": 2
                },
                "out_money": 0,
                "in_money": 1000,
                "aptitudes": {
                    "trucking.trucking": 1.84,
                    "physical.strength": 1.84,
                    "player.player": 1.84
                },
                "description": "Mix aluminum and lead to make solder",
                "products": {
                    "refined_solder": 8
                },
                "location": "LS Foundry"
            },
            "Refine Solder x4": {
                "reagents": {
                    "scrap_lead": 8,
                    "refined_aluminum": 8
                },
                "out_money": 0,
                "in_money": 4000,
                "aptitudes": {
                    "trucking.trucking": 7.36,
                    "physical.strength": 7.36,
                    "player.player": 7.36
                },
                "description": "Mix aluminum and lead to make solder",
                "products": {
                    "refined_solder": 32
                },
                "location": "LS Foundry"
            },
            "Wheels": {
                "reagents": {
                    "mechanicals_rubber": 10,
                    "refined_aluminum": 1
                },
                "out_money": 0,
                "in_money": 20000,
                "aptitudes": {
                    "trucking.trucking": 13.0,
                    "physical.strength": 13.0,
                    "player.player": 12.0
                },
                "description": "Wheels",
                "products": {
                    "mechanicals_wheels": 1
                },
                "location": "Vehicle Parts"
            }
        },
        "export": {
            "Export Aluminum x1": {
                "reagents": {
                    "refined_aluminum": 1
                },
                "out_money": 8400,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 0.21,
                    "physical.strength": 0.21,
                    "player.player": 0.21
                },
                "description": "Export aluminum",
                "products": [],
                "location": "LS Port Export"
            },
            "Export Aluminum x10": {
                "reagents": {
                    "refined_aluminum": 10
                },
                "out_money": 84000,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 2.1,
                    "physical.strength": 2.1,
                    "player.player": 2.1
                },
                "description": "Export aluminum in bulks of 10",
                "products": [],
                "location": "LS Port Export"
            }
        },
        "key": "refined_aluminum"
    },
    "Refined Amalgam": {
        "name": "Refined Amalgam",
        "jobs": {
            "trucker": true,
            "premium.trucking": true
        },
        "value": 35000,
        "pickuplocation": "",
        "craftlocation": "LS Foundry",
        "usagelocation": "Vehicle Factory",
        "exportlocation": "Electronics Store",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Refine Amalgam": {
                "reagents": {
                    "scrap_mercury": 2,
                    "refined_tin": 2
                },
                "out_money": 0,
                "in_money": 1000,
                "aptitudes": {
                    "trucking.trucking": 1.56,
                    "physical.strength": 1.56,
                    "player.player": 1.56
                },
                "description": "A valuable alloy made from mercury and tin",
                "products": {
                    "refined_amalgam": 2
                },
                "location": "LS Foundry"
            },
            "Refine Amalgam x10": {
                "reagents": {
                    "scrap_mercury": 20,
                    "refined_tin": 20
                },
                "out_money": 0,
                "in_money": 10000,
                "aptitudes": {
                    "trucking.trucking": 15.6,
                    "physical.strength": 15.6,
                    "player.player": 15.6
                },
                "description": "A valuable alloy made from mercury and tin",
                "products": {
                    "refined_amalgam": 20
                },
                "location": "LS Foundry"
            }
        },
        "usage": {
            "HVY Nightshark": {
                "reagents": {
                    "liquid_water": 1,
                    "mechanicals_wheels": 4,
                    "crafted_fiberglass": 25,
                    "military_titanium": 60,
                    "mechanicals_vehicle_framework": 2,
                    "mechanicals_battery": 2,
                    "mechanicals_chassis": 2,
                    "crafted_circuit": 12,
                    "refined_glass": 15,
                    "refined_amalgam": 40,
                    "liberty_military_goods": 4
                },
                "description": "HVY Nightshark",
                "out_money": 0,
                "in_money": 13780000,
                "aptitudes": {
                    "trucking.trucking": 13.0,
                    "physical.strength": 13.0,
                    "player.player": 12.0
                },
                "products": {
                    "vehicle_shipment|nightshark|HVY Nightshark|car": 1
                },
                "location": "Vehicle Factory"
            },
            "Karin Futo": {
                "reagents": {
                    "mechanicals_chassis": 1,
                    "mechanicals_wheels": 4,
                    "crafted_fiberglass": 15,
                    "refined_amalgam": 50,
                    "crafted_circuit": 5,
                    "mechanicals_battery": 1,
                    "refined_glass": 25,
                    "mechanicals_vehicle_framework": 1
                },
                "description": "Karin Futo",
                "out_money": 0,
                "in_money": 220000,
                "aptitudes": {
                    "trucking.trucking": 13.0,
                    "physical.strength": 13.0,
                    "player.player": 12.0
                },
                "products": {
                    "vehicle_shipment|futo|Karin Futo|car": 1
                },
                "location": "Vehicle Factory"
            },
            "Coil Savanna": {
                "reagents": {
                    "mechanicals_battery": 1,
                    "crafted_fiberglass": 35,
                    "refined_amalgam": 50,
                    "crafted_circuit": 5,
                    "mechanicals_chassis": 1,
                    "refined_glass": 25,
                    "mechanicals_wheels": 4,
                    "mechanicals_battery_evb": 3,
                    "mechanicals_vehicle_framework": 1
                },
                "description": "Coil Savanna",
                "out_money": 0,
                "in_money": 8380000,
                "aptitudes": {
                    "trucking.trucking": 13.0,
                    "physical.strength": 13.0,
                    "player.player": 12.0
                },
                "products": {
                    "vehicle_shipment|savanna|Coil Savanna|car": 1
                },
                "location": "Vehicle Factory"
            },
            "Annis ZR-350": {
                "reagents": {
                    "mechanicals_chassis": 1,
                    "mechanicals_wheels": 4,
                    "crafted_fiberglass": 15,
                    "refined_amalgam": 50,
                    "crafted_circuit": 5,
                    "mechanicals_battery": 1,
                    "refined_glass": 25,
                    "mechanicals_vehicle_framework": 1
                },
                "description": "Annis ZR-350",
                "out_money": 0,
                "in_money": 1620000,
                "aptitudes": {
                    "trucking.trucking": 13.0,
                    "physical.strength": 13.0,
                    "player.player": 12.0
                },
                "products": {
                    "vehicle_shipment|zr350|Annis ZR-350|car": 1
                },
                "location": "Vehicle Factory"
            },
            "Hijak Vertice": {
                "reagents": {
                    "mechanicals_chassis": 1,
                    "mechanicals_wheels": 4,
                    "crafted_fiberglass": 15,
                    "refined_amalgam": 50,
                    "crafted_circuit": 5,
                    "mechanicals_battery": 1,
                    "refined_glass": 25,
                    "mechanicals_vehicle_framework": 1
                },
                "description": "Hijak Vertice",
                "out_money": 0,
                "in_money": 320000,
                "aptitudes": {
                    "trucking.trucking": 13.0,
                    "physical.strength": 13.0,
                    "player.player": 12.0
                },
                "products": {
                    "vehicle_shipment|vertice|Hijak Vertice|car": 1
                },
                "location": "Vehicle Factory"
            },
            "Coil Rocket Voltic": {
                "reagents": {
                    "mechanicals_wheels": 4,
                    "crafted_fiberglass": 15,
                    "petrochem_kerosene": 100,
                    "mechanicals_chassis": 1,
                    "refined_amalgam": 50,
                    "refined_glass": 25,
                    "mechanicals_battery": 1,
                    "crafted_circuit": 5,
                    "mechanicals_vehicle_framework": 1
                },
                "description": "Coil Rocket Voltic",
                "out_money": 0,
                "in_money": 90110000,
                "aptitudes": {
                    "trucking.trucking": 13.0,
                    "physical.strength": 13.0,
                    "player.player": 12.0
                },
                "products": {
                    "upgrade_kit_voltic2": 1
                },
                "location": "Vehicle Factory"
            },
            "Landstalker XL": {
                "permissionsText": "Landstalker XL Blueprints Secret",
                "in_money": 32000000,
                "aptitudes": {
                    "trucking.trucking": 130.0,
                    "physical.strength": 130.0,
                    "player.player": 120.0
                },
                "products": {
                    "vehicle_shipment|landstalker2|Landstalker XL|car": 1
                },
                "secret": true,
                "description": "Landstalker XL",
                "reagents": {
                    "mechanicals_chassis": 1,
                    "mechanicals_wheels": 4,
                    "crafted_fiberglass": 30,
                    "refined_amalgam": 100,
                    "crafted_circuit": 10,
                    "mechanicals_battery": 2,
                    "refined_glass": 50,
                    "mechanicals_vehicle_framework": 1
                },
                "permissions": [
                    "sd.trucking.shipment.landstalker2"
                ],
                "out_money": 0,
                "location": "Vehicle Factory"
            },
            "Create Rebar": {
                "reagents": {
                    "refined_bronze": 2,
                    "refined_amalgam": 6
                },
                "out_money": 0,
                "in_money": 5000,
                "aptitudes": {
                    "trucking.trucking": 4.79,
                    "physical.strength": 4.79,
                    "player.player": 4.79
                },
                "description": "Create a shipment of rebar",
                "products": {
                    "crafted_rebar": 2
                },
                "location": "LS Factory"
            },
            "Create Rebar x2": {
                "reagents": {
                    "refined_bronze": 4,
                    "refined_amalgam": 12
                },
                "out_money": 0,
                "in_money": 10000,
                "aptitudes": {
                    "trucking.trucking": 9.58,
                    "physical.strength": 9.58,
                    "player.player": 9.58
                },
                "description": "Create a shipment of rebar",
                "products": {
                    "crafted_rebar": 4
                },
                "location": "LS Factory"
            },
            "Vehicle Framework": {
                "reagents": {
                    "refined_amalgam": 25
                },
                "out_money": 0,
                "in_money": 250000,
                "aptitudes": {
                    "trucking.trucking": 13.0,
                    "physical.strength": 13.0,
                    "player.player": 12.0
                },
                "description": "Vehicle Framework",
                "products": {
                    "mechanicals_vehicle_framework": 1
                },
                "location": "Vehicle Parts"
            },
            "Chassis": {
                "reagents": {
                    "refined_amalgam": 15
                },
                "out_money": 0,
                "in_money": 100000,
                "aptitudes": {
                    "trucking.trucking": 13.0,
                    "physical.strength": 13.0,
                    "player.player": 12.0
                },
                "description": "Chassis",
                "products": {
                    "mechanicals_chassis": 1
                },
                "location": "Vehicle Parts"
            }
        },
        "export": {
            "Deliver Amalgam x10": {
                "reagents": {
                    "refined_amalgam": 10
                },
                "out_money": 350000,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 3.1,
                    "physical.strength": 3.1,
                    "player.player": 3.1
                },
                "description": "Deliver amalgam in bulks of 10",
                "products": [],
                "location": "Electronics Store"
            },
            "Deliver Amalgam": {
                "reagents": {
                    "refined_amalgam": 1
                },
                "out_money": 35000,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 0.31,
                    "physical.strength": 0.31,
                    "player.player": 0.31
                },
                "description": "Deliver amalgam",
                "products": [],
                "location": "Electronics Store"
            }
        },
        "key": "refined_amalgam"
    },
    "Refined Copper": {
        "name": "Refined Copper",
        "jobs": {
            "trucker": true
        },
        "value": 10000,
        "pickuplocation": "",
        "craftlocation": "LS Foundry",
        "usagelocation": "LS Factory",
        "exportlocation": "LS Port Export",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Refine Copper x20": {
                "reagents": {
                    "scrap_copper": 40
                },
                "out_money": 0,
                "in_money": 20000,
                "aptitudes": {
                    "trucking.trucking": 5.2,
                    "physical.strength": 5.2,
                    "player.player": 5.2
                },
                "description": "Refine scrap copper into refined copper",
                "products": {
                    "refined_copper": 20
                },
                "location": "LS Foundry"
            },
            "Refine Raw Ore Mix x10": {
                "reagents": {
                    "scrap_ore": 20
                },
                "out_money": 0,
                "in_money": 10000,
                "aptitudes": {
                    "trucking.trucking": 10.9,
                    "physical.strength": 10.9,
                    "player.player": 10.9
                },
                "description": "Smelt down and separate different metals from the raw ore mix",
                "products": {
                    "refined_copper": 10,
                    "refined_zinc": 10
                },
                "location": "LS Foundry"
            },
            "Refine Copper x10": {
                "reagents": {
                    "scrap_copper": 20
                },
                "out_money": 0,
                "in_money": 10000,
                "aptitudes": {
                    "trucking.trucking": 2.6,
                    "physical.strength": 2.6,
                    "player.player": 2.6
                },
                "description": "Refine scrap copper into refined copper",
                "products": {
                    "refined_copper": 10
                },
                "location": "LS Foundry"
            },
            "Refine Raw Ore Mix x1": {
                "reagents": {
                    "scrap_ore": 2
                },
                "out_money": 0,
                "in_money": 1000,
                "aptitudes": {
                    "trucking.trucking": 1.09,
                    "physical.strength": 1.09,
                    "player.player": 1.09
                },
                "description": "Smelt down and separate different metals from the raw ore mix",
                "products": {
                    "refined_copper": 1,
                    "refined_zinc": 1
                },
                "location": "LS Foundry"
            },
            "Refine Copper x1": {
                "reagents": {
                    "scrap_copper": 2
                },
                "out_money": 0,
                "in_money": 1000,
                "aptitudes": {
                    "trucking.trucking": 0.26,
                    "physical.strength": 0.26,
                    "player.player": 0.26
                },
                "description": "Refine scrap copper into refined copper",
                "products": {
                    "refined_copper": 1
                },
                "location": "LS Foundry"
            },
            "Copper Alloy": {
                "permissionsText": "Copper Alloy Secret",
                "in_money": 10000,
                "aptitudes": {
                    "trucking.trucking": 10.0,
                    "physical.strength": 10.0,
                    "player.player": 10.0
                },
                "products": {
                    "refined_copper": 20
                },
                "secret": true,
                "description": "Copper Alloy",
                "reagents": {
                    "petrochem_sulfur": 10,
                    "scrap_ore": 20
                },
                "permissions": [
                    "sd.trucking.foundry.copper"
                ],
                "out_money": 0,
                "location": "LS Foundry"
            }
        },
        "usage": {
            "Create Copper Wire Spool x5": {
                "reagents": {
                    "refined_planks": 5,
                    "refined_copper": 20
                },
                "out_money": 0,
                "in_money": 25000,
                "aptitudes": {
                    "trucking.trucking": 14.5,
                    "physical.strength": 14.5,
                    "player.player": 14.5
                },
                "description": "Create spools of copper wire",
                "products": {
                    "crafted_copperwire": 10
                },
                "location": "LS Factory"
            },
            "Create Copper Wire Spool": {
                "reagents": {
                    "refined_planks": 1,
                    "refined_copper": 4
                },
                "out_money": 0,
                "in_money": 5000,
                "aptitudes": {
                    "trucking.trucking": 2.9,
                    "physical.strength": 2.9,
                    "player.player": 2.9
                },
                "description": "Create spools of copper wire",
                "products": {
                    "crafted_copperwire": 2
                },
                "location": "LS Factory"
            }
        },
        "export": {
            "Export Copper x1": {
                "reagents": {
                    "refined_copper": 1
                },
                "out_money": 10000,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 0.3,
                    "physical.strength": 0.3,
                    "player.player": 0.2
                },
                "description": "Export copper",
                "products": [],
                "location": "LS Port Export"
            },
            "Export Copper x10": {
                "reagents": {
                    "refined_copper": 10
                },
                "out_money": 100000,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 3.0,
                    "physical.strength": 3.0,
                    "player.player": 2.0
                },
                "description": "Export copper in bulks of 10",
                "products": [],
                "location": "LS Port Export"
            }
        },
        "key": "refined_copper"
    },
    "Refined Gold": {
        "name": "Refined Gold",
        "jobs": {
            "trucker": true
        },
        "value": 31000,
        "pickuplocation": "",
        "craftlocation": "LS Foundry",
        "usagelocation": "LS Factory",
        "exportlocation": "Jewelry Store",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Refine Gold x10": {
                "reagents": {
                    "scrap_gold": 10
                },
                "out_money": 0,
                "in_money": 1000,
                "aptitudes": {
                    "trucking.trucking": 3.3,
                    "physical.strength": 3.3,
                    "player.player": 3.3
                },
                "description": "Refine scrap gold into refined gold",
                "products": {
                    "refined_gold": 5
                },
                "location": "LS Foundry"
            }
        },
        "usage": {
            "Create Jewelry": {
                "reagents": {
                    "scrap_emerald": 1,
                    "refined_gold": 2
                },
                "out_money": 0,
                "in_money": 5000,
                "aptitudes": {
                    "trucking.trucking": 2.8,
                    "physical.strength": 2.8,
                    "player.player": 2.8
                },
                "description": "Combine valuable items into even more valuable jewelry.",
                "products": {
                    "crafted_jewelry": 2
                },
                "location": "LS Factory"
            },
            "Titanium Jewelry": {
                "permissionsText": "Titanium Jewelry Secret",
                "in_money": 5000,
                "aptitudes": {
                    "trucking.trucking": 4.79,
                    "physical.strength": 4.79,
                    "player.player": 4.79
                },
                "products": {
                    "crafted_jewelry": 4
                },
                "secret": true,
                "description": "Combine valuable items into even more valuable jewelry.",
                "reagents": {
                    "military_titanium": 1,
                    "refined_gold": 4
                },
                "permissions": [
                    "sd.trucking.factory.jewelry"
                ],
                "out_money": 0,
                "location": "LS Factory"
            }
        },
        "export": {
            "Deliver Refined Gold": {
                "reagents": {
                    "refined_gold": 1
                },
                "out_money": 31000,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 1.71,
                    "physical.strength": 1.71,
                    "player.player": 1.71
                },
                "description": "Deliver Gold.",
                "products": [],
                "location": "Jewelry Store"
            }
        },
        "key": "refined_gold"
    },
    "Refined Solder": {
        "name": "Refined Solder",
        "jobs": {
            "trucker": true
        },
        "value": 5200,
        "pickuplocation": "",
        "craftlocation": "LS Foundry",
        "usagelocation": "LS Factory",
        "exportlocation": "Electronics Store",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Refine Solder": {
                "reagents": {
                    "scrap_lead": 2,
                    "refined_aluminum": 2
                },
                "out_money": 0,
                "in_money": 1000,
                "aptitudes": {
                    "trucking.trucking": 1.84,
                    "physical.strength": 1.84,
                    "player.player": 1.84
                },
                "description": "Mix aluminum and lead to make solder",
                "products": {
                    "refined_solder": 8
                },
                "location": "LS Foundry"
            },
            "Refine Solder x4": {
                "reagents": {
                    "scrap_lead": 8,
                    "refined_aluminum": 8
                },
                "out_money": 0,
                "in_money": 4000,
                "aptitudes": {
                    "trucking.trucking": 7.36,
                    "physical.strength": 7.36,
                    "player.player": 7.36
                },
                "description": "Mix aluminum and lead to make solder",
                "products": {
                    "refined_solder": 32
                },
                "location": "LS Foundry"
            }
        },
        "usage": {
            "Create Circuit Boards x10": {
                "reagents": {
                    "refined_solder": 20,
                    "crafted_copperwire": 10,
                    "scrap_plastic": 100
                },
                "out_money": 0,
                "in_money": 50000,
                "aptitudes": {
                    "trucking.trucking": 26.8,
                    "physical.strength": 26.8,
                    "player.player": 26.8
                },
                "description": "Make 10 Circuit Boards",
                "products": {
                    "crafted_circuit": 20
                },
                "location": "LS Factory"
            },
            "Create Batteries": {
                "reagents": {
                    "refined_solder": 4,
                    "scrap_acid": 8,
                    "refined_zinc": 2
                },
                "out_money": 0,
                "in_money": 5000,
                "aptitudes": {
                    "trucking.trucking": 2.98,
                    "physical.strength": 2.98,
                    "player.player": 2.98
                },
                "description": "Combine magic with metals to store power inside.",
                "products": {
                    "crafted_batteries": 2
                },
                "location": "LS Factory"
            },
            "Create Circuit Boards": {
                "reagents": {
                    "refined_solder": 2,
                    "crafted_copperwire": 1,
                    "scrap_plastic": 10
                },
                "out_money": 0,
                "in_money": 5000,
                "aptitudes": {
                    "trucking.trucking": 2.68,
                    "physical.strength": 2.68,
                    "player.player": 2.68
                },
                "description": "Make Circuit Boards",
                "products": {
                    "crafted_circuit": 2
                },
                "location": "LS Factory"
            },
            "Create Batteries x5": {
                "reagents": {
                    "refined_solder": 20,
                    "scrap_acid": 40,
                    "refined_zinc": 10
                },
                "out_money": 0,
                "in_money": 25000,
                "aptitudes": {
                    "trucking.trucking": 14.9,
                    "physical.strength": 14.9,
                    "player.player": 14.9
                },
                "description": "Combine magic with metals to store power inside.",
                "products": {
                    "crafted_batteries": 10
                },
                "location": "LS Factory"
            }
        },
        "export": {
            "Deliver Solder": {
                "reagents": {
                    "refined_solder": 1
                },
                "out_money": 5200,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 0.23,
                    "physical.strength": 0.23,
                    "player.player": 0.23
                },
                "description": "Deliver solder",
                "products": [],
                "location": "Electronics Store"
            },
            "Deliver Solder x10": {
                "reagents": {
                    "refined_solder": 10
                },
                "out_money": 52000,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 2.3,
                    "physical.strength": 2.3,
                    "player.player": 2.3
                },
                "description": "Deliver solder in bulks of 10",
                "products": [],
                "location": "Electronics Store"
            }
        },
        "key": "refined_solder"
    },
    "Refined Tin": {
        "name": "Refined Tin",
        "jobs": {
            "trucker": true
        },
        "value": 8400,
        "pickuplocation": "",
        "craftlocation": "LS Foundry",
        "usagelocation": "LS Foundry",
        "exportlocation": "LS Port Export",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Refine Tin x10": {
                "reagents": {
                    "scrap_tin": 20
                },
                "out_money": 0,
                "in_money": 10000,
                "aptitudes": {
                    "trucking.trucking": 2.6,
                    "physical.strength": 2.6,
                    "player.player": 2.6
                },
                "description": "Refine scrap tin into refined tin",
                "products": {
                    "refined_tin": 10
                },
                "location": "LS Foundry"
            },
            "Refine Tin x1": {
                "reagents": {
                    "scrap_tin": 2
                },
                "out_money": 0,
                "in_money": 1000,
                "aptitudes": {
                    "trucking.trucking": 0.26,
                    "physical.strength": 0.26,
                    "player.player": 0.26
                },
                "description": "Refine scrap tin into refined tin",
                "products": {
                    "refined_tin": 1
                },
                "location": "LS Foundry"
            },
            "Refine Tin x20": {
                "reagents": {
                    "scrap_tin": 40
                },
                "out_money": 0,
                "in_money": 20000,
                "aptitudes": {
                    "trucking.trucking": 5.2,
                    "physical.strength": 5.2,
                    "player.player": 5.2
                },
                "description": "Refine scrap tin into refined tin",
                "products": {
                    "refined_tin": 20
                },
                "location": "LS Foundry"
            }
        },
        "usage": {
            "Refine Amalgam": {
                "reagents": {
                    "scrap_mercury": 2,
                    "refined_tin": 2
                },
                "out_money": 0,
                "in_money": 1000,
                "aptitudes": {
                    "trucking.trucking": 1.56,
                    "physical.strength": 1.56,
                    "player.player": 1.56
                },
                "description": "A valuable alloy made from mercury and tin",
                "products": {
                    "refined_amalgam": 2
                },
                "location": "LS Foundry"
            },
            "Refine Amalgam x10": {
                "reagents": {
                    "scrap_mercury": 20,
                    "refined_tin": 20
                },
                "out_money": 0,
                "in_money": 10000,
                "aptitudes": {
                    "trucking.trucking": 15.6,
                    "physical.strength": 15.6,
                    "player.player": 15.6
                },
                "description": "A valuable alloy made from mercury and tin",
                "products": {
                    "refined_amalgam": 20
                },
                "location": "LS Foundry"
            }
        },
        "export": {
            "Export Tin x1": {
                "reagents": {
                    "refined_tin": 1
                },
                "out_money": 8400,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 0.21,
                    "physical.strength": 0.21,
                    "player.player": 0.21
                },
                "description": "Export tin",
                "products": [],
                "location": "LS Port Export"
            },
            "Export Tin x10": {
                "reagents": {
                    "refined_tin": 10
                },
                "out_money": 84000,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 2.1,
                    "physical.strength": 2.1,
                    "player.player": 2.1
                },
                "description": "Export tin in bulks of 10",
                "products": [],
                "location": "LS Port Export"
            }
        },
        "key": "refined_tin"
    },
    "Refined Zinc": {
        "name": "Refined Zinc",
        "jobs": {
            "trucker": true
        },
        "value": 11600,
        "pickuplocation": "",
        "craftlocation": "LS Foundry",
        "usagelocation": "LS Factory",
        "exportlocation": "LS Port Export",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Zinc Alloy": {
                "permissionsText": "Zinc Alloy Secret",
                "in_money": 10000,
                "aptitudes": {
                    "trucking.trucking": 10.0,
                    "physical.strength": 10.0,
                    "player.player": 10.0
                },
                "products": {
                    "refined_zinc": 20
                },
                "secret": true,
                "description": "Zinc Alloy",
                "reagents": {
                    "petrochem_propane": 2,
                    "scrap_ore": 20
                },
                "permissions": [
                    "sd.trucking.foundry.zinc"
                ],
                "out_money": 0,
                "location": "LS Foundry"
            },
            "Refine Raw Ore Mix x10": {
                "reagents": {
                    "scrap_ore": 20
                },
                "out_money": 0,
                "in_money": 10000,
                "aptitudes": {
                    "trucking.trucking": 10.9,
                    "physical.strength": 10.9,
                    "player.player": 10.9
                },
                "description": "Smelt down and separate different metals from the raw ore mix",
                "products": {
                    "refined_copper": 10,
                    "refined_zinc": 10
                },
                "location": "LS Foundry"
            },
            "Refine Raw Ore Mix x1": {
                "reagents": {
                    "scrap_ore": 2
                },
                "out_money": 0,
                "in_money": 1000,
                "aptitudes": {
                    "trucking.trucking": 1.09,
                    "physical.strength": 1.09,
                    "player.player": 1.09
                },
                "description": "Smelt down and separate different metals from the raw ore mix",
                "products": {
                    "refined_copper": 1,
                    "refined_zinc": 1
                },
                "location": "LS Foundry"
            }
        },
        "usage": {
            "Create Batteries": {
                "reagents": {
                    "refined_solder": 4,
                    "scrap_acid": 8,
                    "refined_zinc": 2
                },
                "out_money": 0,
                "in_money": 5000,
                "aptitudes": {
                    "trucking.trucking": 2.98,
                    "physical.strength": 2.98,
                    "player.player": 2.98
                },
                "description": "Combine magic with metals to store power inside.",
                "products": {
                    "crafted_batteries": 2
                },
                "location": "LS Factory"
            },
            "Create Batteries x5": {
                "reagents": {
                    "refined_solder": 20,
                    "scrap_acid": 40,
                    "refined_zinc": 10
                },
                "out_money": 0,
                "in_money": 25000,
                "aptitudes": {
                    "trucking.trucking": 14.9,
                    "physical.strength": 14.9,
                    "player.player": 14.9
                },
                "description": "Combine magic with metals to store power inside.",
                "products": {
                    "crafted_batteries": 10
                },
                "location": "LS Factory"
            }
        },
        "export": {
            "Export Zinc x1": {
                "reagents": {
                    "refined_zinc": 1
                },
                "out_money": 11600,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 0.21,
                    "physical.strength": 0.21,
                    "player.player": 0.21
                },
                "description": "Export zinc",
                "products": [],
                "location": "LS Port Export"
            },
            "Export Zinc x10": {
                "reagents": {
                    "refined_zinc": 10
                },
                "out_money": 116000,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 2.1,
                    "physical.strength": 2.1,
                    "player.player": 2.1
                },
                "description": "Export zinc in bulks of 10",
                "products": [],
                "location": "LS Port Export"
            }
        },
        "key": "refined_zinc"
    },
    "Repair Shop": {
        "name": "Repair Shop",
        "jobs": {
            "premium.trucking": true
        },
        "value": 0,
        "pickuplocation": "",
        "craftlocation": "Vehicle Parts",
        "usagelocation": "",
        "exportlocation": "",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Temporary Repair Shop": {
                "reagents": {
                    "military_titanium": 2,
                    "mechanicals_wheels": 2,
                    "pucargosmall": 2,
                    "mechanicals_chassis": 2
                },
                "out_money": 0,
                "in_money": 1500000,
                "aptitudes": {
                    "trucking.trucking": 13.0,
                    "physical.strength": 13.0,
                    "player.player": 12.0
                },
                "description": "Temporary Repair Shop",
                "products": {
                    "repair_shop": 1
                },
                "location": "Vehicle Parts"
            }
        },
        "usage": {},
        "export": {},
        "key": "repair_shop"
    },
    "Rubber": {
        "name": "Rubber",
        "jobs": {
            "petrochem": true,
            "trucker": true,
            "premium.trucking": true
        },
        "value": 10000,
        "pickuplocation": "",
        "craftlocation": "Refinery",
        "usagelocation": "Vehicle Parts",
        "exportlocation": "LS Port Export",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Refine Rubber": {
                "reagents": {
                    "petrochem_oil": 4
                },
                "out_money": 0,
                "in_money": 41000,
                "aptitudes": [],
                "description": "Refine Rubber",
                "products": {
                    "mechanicals_rubber": 4,
                    "petrochem_diesel": 2,
                    "petrochem_petrol": 4,
                    "petrochem_kerosene": 2
                },
                "location": "Refinery"
            }
        },
        "usage": {
            "Wheels": {
                "reagents": {
                    "mechanicals_rubber": 10,
                    "refined_aluminum": 1
                },
                "out_money": 0,
                "in_money": 20000,
                "aptitudes": {
                    "trucking.trucking": 13.0,
                    "physical.strength": 13.0,
                    "player.player": 12.0
                },
                "description": "Wheels",
                "products": {
                    "mechanicals_wheels": 1
                },
                "location": "Vehicle Parts"
            }
        },
        "export": {
            "Export Rubber": {
                "reagents": {
                    "mechanicals_rubber": 1
                },
                "out_money": 10000,
                "in_money": 0,
                "aptitudes": [],
                "description": "Export Rubber",
                "products": [],
                "location": "LS Port Export"
            },
            "Export Rubber x10": {
                "reagents": {
                    "mechanicals_rubber": 10
                },
                "out_money": 100000,
                "in_money": 0,
                "aptitudes": [],
                "description": "Export Rubber x10",
                "products": [],
                "location": "LS Port Export"
            }
        },
        "key": "mechanicals_rubber"
    },
    "Sand": {
        "name": "Sand",
        "jobs": {
            "military": true,
            "trucker": true
        },
        "value": 1500,
        "pickuplocation": "",
        "craftlocation": "Deep Quarry",
        "usagelocation": "LS Foundry",
        "exportlocation": "Quarry",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Gravel Pulverizing": {
                "permissionsText": "Gravel Pulverizing Secret",
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 13.35,
                    "physical.strength": 13.35,
                    "player.player": 13.35
                },
                "products": {
                    "refined_sand": 100
                },
                "secret": true,
                "description": "Gravel Pulverizing",
                "reagents": {
                    "scrap_gravel": 20,
                    "military_explosives": 1
                },
                "permissions": [
                    "sd.trucking.quarry.gravel"
                ],
                "out_money": 0,
                "location": "Deep Quarry"
            },
            "Recycle Ore Mix": {
                "permissionsText": "Ore Mix Recycling Secret",
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 13.35,
                    "physical.strength": 13.35,
                    "player.player": 13.35
                },
                "products": {
                    "refined_sand": 90
                },
                "secret": true,
                "description": "Recycle Ore Mix",
                "reagents": {
                    "military_explosives": 1,
                    "scrap_ore": 15
                },
                "permissions": [
                    "sd.trucking.quarry.ore"
                ],
                "out_money": 0,
                "location": "Deep Quarry"
            },
            "Use Explosives": {
                "reagents": {
                    "military_explosives": 1
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 13.35,
                    "physical.strength": 13.35,
                    "player.player": 13.35
                },
                "description": "Use Explosives",
                "products": {
                    "scrap_gravel": 30,
                    "refined_sand": 20
                },
                "location": "Deep Quarry"
            },
            "Filter Gravel": {
                "reagents": {
                    "scrap_gravel": 10
                },
                "out_money": 0,
                "in_money": 15000,
                "aptitudes": {
                    "trucking.trucking": 0.24,
                    "physical.strength": 0.24,
                    "player.player": 0.24
                },
                "description": "Filter materials out of the gravel.",
                "products": {
                    "refined_flint": 4,
                    "refined_sand": 6
                },
                "location": "Filtering Plant"
            },
            "Filter Gravel x6": {
                "reagents": {
                    "scrap_gravel": 60
                },
                "out_money": 0,
                "in_money": 90000,
                "aptitudes": {
                    "trucking.trucking": 1.44,
                    "physical.strength": 1.44,
                    "player.player": 1.44
                },
                "description": "Filter materials out of the gravel.",
                "products": {
                    "refined_flint": 24,
                    "refined_sand": 36
                },
                "location": "Filtering Plant"
            }
        },
        "usage": {
            "Ceramic Tiles": {
                "reagents": {
                    "refined_flint": 10,
                    "refined_sand": 2
                },
                "out_money": 0,
                "in_money": 1000,
                "aptitudes": {
                    "trucking.trucking": 2.88,
                    "physical.strength": 2.88,
                    "player.player": 2.88
                },
                "description": "Make Ceramic Tiles",
                "products": {
                    "crafted_ceramictiles": 2
                },
                "location": "LS Foundry"
            },
            "Refine Glass x10": {
                "reagents": {
                    "refined_sand": 10
                },
                "out_money": 0,
                "in_money": 10000,
                "aptitudes": {
                    "trucking.trucking": 2.9,
                    "physical.strength": 2.9,
                    "player.player": 2.9
                },
                "description": "Create glass out of that rich sand",
                "products": {
                    "refined_glass": 10
                },
                "location": "LS Foundry"
            },
            "Ceramic Tiles x10": {
                "reagents": {
                    "refined_flint": 100,
                    "refined_sand": 20
                },
                "out_money": 0,
                "in_money": 10000,
                "aptitudes": {
                    "trucking.trucking": 28.79999999999999,
                    "physical.strength": 28.79999999999999,
                    "player.player": 28.79999999999999
                },
                "description": "Make 10 Ceramic Tiles",
                "products": {
                    "crafted_ceramictiles": 20
                },
                "location": "LS Foundry"
            },
            "Refine Glass x1": {
                "reagents": {
                    "refined_sand": 1
                },
                "out_money": 0,
                "in_money": 1000,
                "aptitudes": {
                    "trucking.trucking": 0.29,
                    "physical.strength": 0.29,
                    "player.player": 0.29
                },
                "description": "Create glass out of that rich sand",
                "products": {
                    "refined_glass": 1
                },
                "location": "LS Foundry"
            },
            "Create Cement": {
                "reagents": {
                    "tcargodust": 2,
                    "refined_sand": 5
                },
                "out_money": 0,
                "in_money": 1500,
                "aptitudes": {
                    "trucking.trucking": 0.71,
                    "physical.strength": 0.71,
                    "player.player": 0.71
                },
                "description": "Mix together a cement mix",
                "products": {
                    "crafted_cement": 1
                },
                "location": "Quarry"
            },
            "Create Cement x10": {
                "reagents": {
                    "tcargodust": 20,
                    "refined_sand": 50
                },
                "out_money": 0,
                "in_money": 15000,
                "aptitudes": {
                    "trucking.trucking": 7.1,
                    "physical.strength": 7.1,
                    "player.player": 7.1
                },
                "description": "Mix together a cement mix",
                "products": {
                    "crafted_cement": 10
                },
                "location": "Quarry"
            },
            "Sawdust Filler Exploit": {
                "permissionsText": "Sawdust Filler Exploit Secret",
                "in_money": 2500,
                "aptitudes": {
                    "trucking.trucking": 36.3,
                    "physical.strength": 36.3,
                    "player.player": 36.3
                },
                "products": {
                    "tcargodust": 100
                },
                "secret": true,
                "description": "Grind a bulk of 5 Logs into Sawdust",
                "reagents": {
                    "tcargologs": 5,
                    "refined_sand": 10
                },
                "permissions": [
                    "sd.trucking.sawmill.sawdust"
                ],
                "out_money": 0,
                "location": "Sawmill"
            }
        },
        "export": {
            "Deliver Sand": {
                "reagents": {
                    "refined_sand": 1
                },
                "out_money": 1500,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 1.37,
                    "physical.strength": 1.37,
                    "player.player": 1.37
                },
                "description": "Deliver Sand.",
                "products": [],
                "location": "Quarry"
            }
        },
        "key": "refined_sand"
    },
    "Sawdust": {
        "name": "Sawdust",
        "jobs": {
            "trucker": true,
            "fridge": true
        },
        "value": 1800,
        "pickuplocation": "",
        "craftlocation": "Sawmill",
        "usagelocation": "Quarry",
        "exportlocation": "LS Port Export",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Grind Sawdust x5": {
                "reagents": {
                    "tcargologs": 5
                },
                "out_money": 0,
                "in_money": 2500,
                "aptitudes": {
                    "trucking.trucking": 18.15,
                    "physical.strength": 18.15,
                    "player.player": 18.15
                },
                "description": "Grind a bulk of 5 Logs into Sawdust",
                "products": {
                    "tcargodust": 50
                },
                "location": "Sawmill"
            },
            "Grind Sawdust x1": {
                "reagents": {
                    "tcargologs": 1
                },
                "out_money": 0,
                "in_money": 500,
                "aptitudes": {
                    "trucking.trucking": 3.63,
                    "physical.strength": 3.63,
                    "player.player": 3.63
                },
                "description": "Grind Logs into Sawdust",
                "products": {
                    "tcargodust": 10
                },
                "location": "Sawmill"
            },
            "Mill Planks x1": {
                "reagents": {
                    "tcargologs": 1
                },
                "out_money": 0,
                "in_money": 500,
                "aptitudes": {
                    "trucking.trucking": 3.63,
                    "physical.strength": 3.63,
                    "player.player": 3.63
                },
                "description": "Make high quality planks out of the logs",
                "products": {
                    "refined_planks": 1,
                    "tcargodust": 2
                },
                "location": "Sawmill"
            },
            "Mill Planks x5": {
                "reagents": {
                    "tcargologs": 5
                },
                "out_money": 0,
                "in_money": 2500,
                "aptitudes": {
                    "trucking.trucking": 18.15,
                    "physical.strength": 18.15,
                    "player.player": 18.15
                },
                "description": "Make high quality planks out of the bulk of 5 logs",
                "products": {
                    "refined_planks": 5,
                    "tcargodust": 10
                },
                "location": "Sawmill"
            },
            "Sawdust Filler Exploit": {
                "permissionsText": "Sawdust Filler Exploit Secret",
                "in_money": 2500,
                "aptitudes": {
                    "trucking.trucking": 36.3,
                    "physical.strength": 36.3,
                    "player.player": 36.3
                },
                "products": {
                    "tcargodust": 100
                },
                "secret": true,
                "description": "Grind a bulk of 5 Logs into Sawdust",
                "reagents": {
                    "tcargologs": 5,
                    "refined_sand": 10
                },
                "permissions": [
                    "sd.trucking.sawmill.sawdust"
                ],
                "out_money": 0,
                "location": "Sawmill"
            }
        },
        "usage": {
            "Create Cement": {
                "reagents": {
                    "tcargodust": 2,
                    "refined_sand": 5
                },
                "out_money": 0,
                "in_money": 1500,
                "aptitudes": {
                    "trucking.trucking": 0.71,
                    "physical.strength": 0.71,
                    "player.player": 0.71
                },
                "description": "Mix together a cement mix",
                "products": {
                    "crafted_cement": 1
                },
                "location": "Quarry"
            },
            "Create Cement x10": {
                "reagents": {
                    "tcargodust": 20,
                    "refined_sand": 50
                },
                "out_money": 0,
                "in_money": 15000,
                "aptitudes": {
                    "trucking.trucking": 7.1,
                    "physical.strength": 7.1,
                    "player.player": 7.1
                },
                "description": "Mix together a cement mix",
                "products": {
                    "crafted_cement": 10
                },
                "location": "Quarry"
            },
            "Chipboard Planks": {
                "permissionsText": "Chipboard Planks Secret",
                "in_money": 2500,
                "aptitudes": {
                    "trucking.trucking": 18.15,
                    "physical.strength": 18.15,
                    "player.player": 18.15
                },
                "products": {
                    "refined_planks": 15
                },
                "secret": true,
                "description": "Make high quality planks out of the bulk of 5 logs",
                "reagents": {
                    "tcargodust": 30,
                    "tcargologs": 5
                },
                "permissions": [
                    "sd.trucking.sawmill.plank"
                ],
                "out_money": 0,
                "location": "Sawmill"
            },
            "Pack Crispy Meat x10": {
                "permissionsText": "Crispy Meat Secret",
                "in_money": 0,
                "aptitudes": [],
                "products": {
                    "fridge_meat": 10
                },
                "secret": true,
                "description": "Pack Crispy Meat x10",
                "reagents": {
                    "meat": 200,
                    "tcargodust": 20
                },
                "permissions": [
                    "sd.trucking.clucking.meat"
                ],
                "out_money": 0,
                "location": "Clucking Bell Farms"
            },
            "Pack Crispy Fish Meat x10": {
                "permissionsText": "Crispy Fish Secret",
                "in_money": 0,
                "aptitudes": [],
                "products": {
                    "fridge_meat": 10
                },
                "secret": true,
                "description": "Pack Crispy Fish Meat x10",
                "reagents": {
                    "fish_meat": 1000,
                    "tcargodust": 20
                },
                "permissions": [
                    "sd.trucking.clucking.fish"
                ],
                "out_money": 0,
                "location": "Clucking Bell Farms"
            },
            "Create Cardboard": {
                "permissionsText": "Cardboard Manufacturing Secret",
                "in_money": 5000,
                "aptitudes": {
                    "trucking.trucking": 3.81,
                    "physical.strength": 3.81,
                    "player.player": 3.81
                },
                "products": {
                    "crafted_cardboard": 5
                },
                "secret": true,
                "description": "Create Cardboard",
                "reagents": {
                    "tcargodust": 50,
                    "liquid_water": 1
                },
                "permissions": [
                    "sd.trucking.cardboard"
                ],
                "out_money": 0,
                "location": "LS Factory"
            }
        },
        "export": {
            "<span sort='B'></span>Export Sawdust x10": {
                "reagents": {
                    "tcargodust": 10
                },
                "out_money": 18000,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 1.6,
                    "physical.strength": 1.6,
                    "player.player": 1.6
                },
                "description": "Export sawdust in bulks of 10",
                "products": [],
                "location": "LS Port Export"
            },
            "<span sort='A'></span>Export Sawdust x1": {
                "reagents": {
                    "tcargodust": 1
                },
                "out_money": 1800,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 0.16,
                    "physical.strength": 0.16,
                    "player.player": 0.16
                },
                "description": "Export sawdust",
                "products": [],
                "location": "LS Port Export"
            }
        },
        "key": "tcargodust"
    },
    "Scrap Aluminum": {
        "name": "Scrap Aluminum",
        "jobs": {
            "trucker": true
        },
        "value": 0,
        "pickuplocation": "",
        "craftlocation": "Sorting Facility",
        "usagelocation": "LS Foundry",
        "exportlocation": "",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Sort Recycled Trash x3": {
                "reagents": {
                    "recycled_trash": 3
                },
                "out_money": 0,
                "in_money": 75000,
                "aptitudes": {
                    "trucking.trucking": 9.81,
                    "physical.strength": 9.81,
                    "player.player": 9.81
                },
                "description": "Break down your recycled components",
                "products": {
                    "scrap_plastic": 24,
                    "scrap_aluminum": 12,
                    "scrap_tin": 12
                },
                "location": "Sorting Facility"
            },
            "Sort Recycled Trash": {
                "reagents": {
                    "recycled_trash": 1
                },
                "out_money": 0,
                "in_money": 25000,
                "aptitudes": {
                    "trucking.trucking": 3.27,
                    "physical.strength": 3.27,
                    "player.player": 3.27
                },
                "description": "Break down your recycled components",
                "products": {
                    "scrap_plastic": 8,
                    "scrap_aluminum": 4,
                    "scrap_tin": 4
                },
                "location": "Sorting Facility"
            }
        },
        "usage": {
            "Refine Bronze Alloy x1": {
                "reagents": {
                    "scrap_aluminum": 1,
                    "scrap_tin": 1,
                    "scrap_copper": 2
                },
                "out_money": 0,
                "in_money": 1000,
                "aptitudes": {
                    "trucking.trucking": 0.84,
                    "physical.strength": 0.84,
                    "player.player": 0.84
                },
                "description": "Mix multiple metals into bronze alloy",
                "products": {
                    "refined_bronze": 2
                },
                "location": "LS Foundry"
            },
            "Refine Aluminum x1": {
                "reagents": {
                    "scrap_aluminum": 2
                },
                "out_money": 0,
                "in_money": 1000,
                "aptitudes": {
                    "trucking.trucking": 0.33,
                    "physical.strength": 0.33,
                    "player.player": 0.33
                },
                "description": "Refine scrap aluminum into refined aluminum",
                "products": {
                    "refined_aluminum": 1
                },
                "location": "LS Foundry"
            },
            "Refine Bronze Alloy x10": {
                "reagents": {
                    "scrap_aluminum": 10,
                    "scrap_tin": 10,
                    "scrap_copper": 20
                },
                "out_money": 0,
                "in_money": 10000,
                "aptitudes": {
                    "trucking.trucking": 8.4,
                    "physical.strength": 8.4,
                    "player.player": 8.4
                },
                "description": "Mix multiple metals into bronze alloy",
                "products": {
                    "refined_bronze": 20
                },
                "location": "LS Foundry"
            },
            "Refine Aluminum x10": {
                "reagents": {
                    "scrap_aluminum": 20
                },
                "out_money": 0,
                "in_money": 10000,
                "aptitudes": {
                    "trucking.trucking": 3.3,
                    "physical.strength": 3.3,
                    "player.player": 3.3
                },
                "description": "Refine scrap aluminum into refined aluminum",
                "products": {
                    "refined_aluminum": 10
                },
                "location": "LS Foundry"
            }
        },
        "export": {},
        "key": "scrap_aluminum"
    },
    "Scrap Copper": {
        "name": "Scrap Copper",
        "jobs": {
            "trucker": true
        },
        "value": 0,
        "pickuplocation": "",
        "craftlocation": "Sorting Facility",
        "usagelocation": "LS Foundry",
        "exportlocation": "",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Sort Recycled Electronics x2": {
                "reagents": {
                    "recycled_electronics": 2
                },
                "out_money": 0,
                "in_money": 50000,
                "aptitudes": {
                    "trucking.trucking": 6.02,
                    "physical.strength": 6.02,
                    "player.player": 6.02
                },
                "description": "Break down your recycled components",
                "products": {
                    "scrap_plastic": 24,
                    "scrap_copper": 16,
                    "scrap_gold": 2
                },
                "location": "Sorting Facility"
            },
            "Sort Recycled Electronics": {
                "reagents": {
                    "recycled_electronics": 1
                },
                "out_money": 0,
                "in_money": 25000,
                "aptitudes": {
                    "trucking.trucking": 3.01,
                    "physical.strength": 3.01,
                    "player.player": 3.01
                },
                "description": "Break down your recycled components",
                "products": {
                    "scrap_plastic": 12,
                    "scrap_copper": 8,
                    "scrap_gold": 1
                },
                "location": "Sorting Facility"
            }
        },
        "usage": {
            "Refine Copper x20": {
                "reagents": {
                    "scrap_copper": 40
                },
                "out_money": 0,
                "in_money": 20000,
                "aptitudes": {
                    "trucking.trucking": 5.2,
                    "physical.strength": 5.2,
                    "player.player": 5.2
                },
                "description": "Refine scrap copper into refined copper",
                "products": {
                    "refined_copper": 20
                },
                "location": "LS Foundry"
            },
            "Refine Bronze Alloy x1": {
                "reagents": {
                    "scrap_aluminum": 1,
                    "scrap_tin": 1,
                    "scrap_copper": 2
                },
                "out_money": 0,
                "in_money": 1000,
                "aptitudes": {
                    "trucking.trucking": 0.84,
                    "physical.strength": 0.84,
                    "player.player": 0.84
                },
                "description": "Mix multiple metals into bronze alloy",
                "products": {
                    "refined_bronze": 2
                },
                "location": "LS Foundry"
            },
            "Refine Bronze Alloy x10": {
                "reagents": {
                    "scrap_aluminum": 10,
                    "scrap_tin": 10,
                    "scrap_copper": 20
                },
                "out_money": 0,
                "in_money": 10000,
                "aptitudes": {
                    "trucking.trucking": 8.4,
                    "physical.strength": 8.4,
                    "player.player": 8.4
                },
                "description": "Mix multiple metals into bronze alloy",
                "products": {
                    "refined_bronze": 20
                },
                "location": "LS Foundry"
            },
            "Refine Copper x10": {
                "reagents": {
                    "scrap_copper": 20
                },
                "out_money": 0,
                "in_money": 10000,
                "aptitudes": {
                    "trucking.trucking": 2.6,
                    "physical.strength": 2.6,
                    "player.player": 2.6
                },
                "description": "Refine scrap copper into refined copper",
                "products": {
                    "refined_copper": 10
                },
                "location": "LS Foundry"
            },
            "Refine Copper x1": {
                "reagents": {
                    "scrap_copper": 2
                },
                "out_money": 0,
                "in_money": 1000,
                "aptitudes": {
                    "trucking.trucking": 0.26,
                    "physical.strength": 0.26,
                    "player.player": 0.26
                },
                "description": "Refine scrap copper into refined copper",
                "products": {
                    "refined_copper": 1
                },
                "location": "LS Foundry"
            }
        },
        "export": {},
        "key": "scrap_copper"
    },
    "Scrap Gold": {
        "name": "Scrap Gold",
        "jobs": {
            "trucker": true,
            "military": true
        },
        "value": 0,
        "pickuplocation": "",
        "craftlocation": "LS Foundry",
        "usagelocation": "LS Foundry",
        "exportlocation": "",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Substitute Gold": {
                "permissionsText": "Substitute Gold Secret",
                "in_money": 1000,
                "aptitudes": {
                    "trucking.trucking": 10.0,
                    "physical.strength": 10.0,
                    "player.player": 10.0
                },
                "products": {
                    "scrap_gold": 40
                },
                "secret": true,
                "description": "Substitute Gold",
                "reagents": {
                    "petrochem_petrol": 2,
                    "petrochem_sulfur": 10,
                    "refined_bronze": 25
                },
                "permissions": [
                    "sd.trucking.foundry.gold"
                ],
                "out_money": 0,
                "location": "LS Foundry"
            },
            "Sort Recycled Electronics x2": {
                "reagents": {
                    "recycled_electronics": 2
                },
                "out_money": 0,
                "in_money": 50000,
                "aptitudes": {
                    "trucking.trucking": 6.02,
                    "physical.strength": 6.02,
                    "player.player": 6.02
                },
                "description": "Break down your recycled components",
                "products": {
                    "scrap_plastic": 24,
                    "scrap_copper": 16,
                    "scrap_gold": 2
                },
                "location": "Sorting Facility"
            },
            "Sort Recycled Electronics": {
                "reagents": {
                    "recycled_electronics": 1
                },
                "out_money": 0,
                "in_money": 25000,
                "aptitudes": {
                    "trucking.trucking": 3.01,
                    "physical.strength": 3.01,
                    "player.player": 3.01
                },
                "description": "Break down your recycled components",
                "products": {
                    "scrap_plastic": 12,
                    "scrap_copper": 8,
                    "scrap_gold": 1
                },
                "location": "Sorting Facility"
            },
            "Use Explosives": {
                "reagents": {
                    "military_explosives": 1
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 11.5,
                    "physical.strength": 11.5,
                    "player.player": 11.5
                },
                "description": "Use Explosives",
                "products": {
                    "military_titanium_ore": 4,
                    "scrap_gold": 10
                },
                "location": "GSD Mine"
            }
        },
        "usage": {
            "Refine Gold x10": {
                "reagents": {
                    "scrap_gold": 10
                },
                "out_money": 0,
                "in_money": 1000,
                "aptitudes": {
                    "trucking.trucking": 3.3,
                    "physical.strength": 3.3,
                    "player.player": 3.3
                },
                "description": "Refine scrap gold into refined gold",
                "products": {
                    "refined_gold": 5
                },
                "location": "LS Foundry"
            },
            "Create Computer": {
                "reagents": {
                    "crafted_circuit": 1,
                    "crafted_batteries": 1,
                    "scrap_gold": 2
                },
                "out_money": 0,
                "in_money": 5000,
                "aptitudes": {
                    "trucking.trucking": 3.81,
                    "physical.strength": 3.81,
                    "player.player": 3.81
                },
                "description": "Make Computers",
                "products": {
                    "crafted_computer": 2
                },
                "location": "LS Factory"
            },
            "Create Computer x10": {
                "reagents": {
                    "crafted_circuit": 10,
                    "crafted_batteries": 10,
                    "scrap_gold": 20
                },
                "out_money": 0,
                "in_money": 50000,
                "aptitudes": {
                    "trucking.trucking": 38.1,
                    "physical.strength": 38.1,
                    "player.player": 38.1
                },
                "description": "Make 10 Computers",
                "products": {
                    "crafted_computer": 20
                },
                "location": "LS Factory"
            }
        },
        "export": {},
        "key": "scrap_gold"
    },
    "Scrap Lead": {
        "name": "Scrap Lead",
        "jobs": {
            "trucker": true
        },
        "value": 0,
        "pickuplocation": "",
        "craftlocation": "Filtering Plant",
        "usagelocation": "LS Foundry",
        "exportlocation": "",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Filter Toxic Waste x3": {
                "reagents": {
                    "recycled_waste": 3
                },
                "out_money": 0,
                "in_money": 45000,
                "aptitudes": {
                    "trucking.trucking": 17.64,
                    "physical.strength": 17.64,
                    "player.player": 17.64
                },
                "description": "Filter waste materials out of the waste.",
                "products": {
                    "scrap_mercury": 6,
                    "scrap_lead": 6,
                    "scrap_acid": 12
                },
                "location": "Filtering Plant"
            },
            "Filter Toxic Waste": {
                "reagents": {
                    "recycled_waste": 1
                },
                "out_money": 0,
                "in_money": 15000,
                "aptitudes": {
                    "trucking.trucking": 5.88,
                    "physical.strength": 5.88,
                    "player.player": 5.88
                },
                "description": "Filter waste materials out of the waste.",
                "products": {
                    "scrap_mercury": 2,
                    "scrap_lead": 2,
                    "scrap_acid": 4
                },
                "location": "Filtering Plant"
            }
        },
        "usage": {
            "Refine Solder": {
                "reagents": {
                    "scrap_lead": 2,
                    "refined_aluminum": 2
                },
                "out_money": 0,
                "in_money": 1000,
                "aptitudes": {
                    "trucking.trucking": 1.84,
                    "physical.strength": 1.84,
                    "player.player": 1.84
                },
                "description": "Mix aluminum and lead to make solder",
                "products": {
                    "refined_solder": 8
                },
                "location": "LS Foundry"
            },
            "Refine Solder x4": {
                "reagents": {
                    "scrap_lead": 8,
                    "refined_aluminum": 8
                },
                "out_money": 0,
                "in_money": 4000,
                "aptitudes": {
                    "trucking.trucking": 7.36,
                    "physical.strength": 7.36,
                    "player.player": 7.36
                },
                "description": "Mix aluminum and lead to make solder",
                "products": {
                    "refined_solder": 32
                },
                "location": "LS Foundry"
            }
        },
        "export": {},
        "key": "scrap_lead"
    },
    "Scrap Mercury": {
        "name": "Scrap Mercury",
        "jobs": {
            "trucker": true
        },
        "value": 0,
        "pickuplocation": "",
        "craftlocation": "Filtering Plant",
        "usagelocation": "LS Foundry",
        "exportlocation": "",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Filter Toxic Waste x3": {
                "reagents": {
                    "recycled_waste": 3
                },
                "out_money": 0,
                "in_money": 45000,
                "aptitudes": {
                    "trucking.trucking": 17.64,
                    "physical.strength": 17.64,
                    "player.player": 17.64
                },
                "description": "Filter waste materials out of the waste.",
                "products": {
                    "scrap_mercury": 6,
                    "scrap_lead": 6,
                    "scrap_acid": 12
                },
                "location": "Filtering Plant"
            },
            "Filter Toxic Waste": {
                "reagents": {
                    "recycled_waste": 1
                },
                "out_money": 0,
                "in_money": 15000,
                "aptitudes": {
                    "trucking.trucking": 5.88,
                    "physical.strength": 5.88,
                    "player.player": 5.88
                },
                "description": "Filter waste materials out of the waste.",
                "products": {
                    "scrap_mercury": 2,
                    "scrap_lead": 2,
                    "scrap_acid": 4
                },
                "location": "Filtering Plant"
            }
        },
        "usage": {
            "Refine Amalgam": {
                "reagents": {
                    "scrap_mercury": 2,
                    "refined_tin": 2
                },
                "out_money": 0,
                "in_money": 1000,
                "aptitudes": {
                    "trucking.trucking": 1.56,
                    "physical.strength": 1.56,
                    "player.player": 1.56
                },
                "description": "A valuable alloy made from mercury and tin",
                "products": {
                    "refined_amalgam": 2
                },
                "location": "LS Foundry"
            },
            "Refine Amalgam x10": {
                "reagents": {
                    "scrap_mercury": 20,
                    "refined_tin": 20
                },
                "out_money": 0,
                "in_money": 10000,
                "aptitudes": {
                    "trucking.trucking": 15.6,
                    "physical.strength": 15.6,
                    "player.player": 15.6
                },
                "description": "A valuable alloy made from mercury and tin",
                "products": {
                    "refined_amalgam": 20
                },
                "location": "LS Foundry"
            }
        },
        "export": {},
        "key": "scrap_mercury"
    },
    "Scrap Plastic": {
        "name": "Scrap Plastic",
        "jobs": {
            "trucker": true
        },
        "value": 3600,
        "pickuplocation": "",
        "craftlocation": "Sorting Facility",
        "usagelocation": "Plastic Molding",
        "exportlocation": "McKenzie Export",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Sort Recycled Electronics x2": {
                "reagents": {
                    "recycled_electronics": 2
                },
                "out_money": 0,
                "in_money": 50000,
                "aptitudes": {
                    "trucking.trucking": 6.02,
                    "physical.strength": 6.02,
                    "player.player": 6.02
                },
                "description": "Break down your recycled components",
                "products": {
                    "scrap_plastic": 24,
                    "scrap_copper": 16,
                    "scrap_gold": 2
                },
                "location": "Sorting Facility"
            },
            "Sort Recycled Electronics": {
                "reagents": {
                    "recycled_electronics": 1
                },
                "out_money": 0,
                "in_money": 25000,
                "aptitudes": {
                    "trucking.trucking": 3.01,
                    "physical.strength": 3.01,
                    "player.player": 3.01
                },
                "description": "Break down your recycled components",
                "products": {
                    "scrap_plastic": 12,
                    "scrap_copper": 8,
                    "scrap_gold": 1
                },
                "location": "Sorting Facility"
            },
            "Sort Recycled Trash x3": {
                "reagents": {
                    "recycled_trash": 3
                },
                "out_money": 0,
                "in_money": 75000,
                "aptitudes": {
                    "trucking.trucking": 9.81,
                    "physical.strength": 9.81,
                    "player.player": 9.81
                },
                "description": "Break down your recycled components",
                "products": {
                    "scrap_plastic": 24,
                    "scrap_aluminum": 12,
                    "scrap_tin": 12
                },
                "location": "Sorting Facility"
            },
            "Sort Recycled Trash": {
                "reagents": {
                    "recycled_trash": 1
                },
                "out_money": 0,
                "in_money": 25000,
                "aptitudes": {
                    "trucking.trucking": 3.27,
                    "physical.strength": 3.27,
                    "player.player": 3.27
                },
                "description": "Break down your recycled components",
                "products": {
                    "scrap_plastic": 8,
                    "scrap_aluminum": 4,
                    "scrap_tin": 4
                },
                "location": "Sorting Facility"
            }
        },
        "usage": {
            "Craft Empty Defib Kit": {
                "in_money": 10000,
                "aptitudes": {
                    "player.player": 0.1,
                    "trucking.trucking": 0.5
                },
                "products": {
                    "e_defibkit": 5
                },
                "onSelect": false,
                "reagents": {
                    "scrap_plastic": 10
                },
                "out_money": 0,
                "description": "Defib Kits",
                "onLeave": false,
                "onTransform": false,
                "cost": 1,
                "location": "Plastic Molding"
            },
            "Craft Empty Pill Capsule": {
                "in_money": 1000,
                "aptitudes": {
                    "player.player": 0.1,
                    "trucking.trucking": 0.5
                },
                "products": {
                    "empty_box_capsules": 5
                },
                "onSelect": false,
                "reagents": {
                    "scrap_plastic": 10
                },
                "out_money": 0,
                "description": "Pills Capsule",
                "onLeave": false,
                "onTransform": false,
                "cost": 1,
                "location": "Plastic Molding"
            },
            "Create Circuit Boards x10": {
                "reagents": {
                    "refined_solder": 20,
                    "crafted_copperwire": 10,
                    "scrap_plastic": 100
                },
                "out_money": 0,
                "in_money": 50000,
                "aptitudes": {
                    "trucking.trucking": 26.8,
                    "physical.strength": 26.8,
                    "player.player": 26.8
                },
                "description": "Make 10 Circuit Boards",
                "products": {
                    "crafted_circuit": 20
                },
                "location": "LS Factory"
            },
            "Create Circuit Boards": {
                "reagents": {
                    "refined_solder": 2,
                    "crafted_copperwire": 1,
                    "scrap_plastic": 10
                },
                "out_money": 0,
                "in_money": 5000,
                "aptitudes": {
                    "trucking.trucking": 2.68,
                    "physical.strength": 2.68,
                    "player.player": 2.68
                },
                "description": "Make Circuit Boards",
                "products": {
                    "crafted_circuit": 2
                },
                "location": "LS Factory"
            },
            "Create Fiberglass Spool": {
                "reagents": {
                    "refined_planks": 1,
                    "scrap_plastic": 8,
                    "refined_glass": 4
                },
                "out_money": 0,
                "in_money": 5000,
                "aptitudes": {
                    "trucking.trucking": 1.81,
                    "physical.strength": 1.81,
                    "player.player": 1.81
                },
                "description": "Create spools of fiberglass",
                "products": {
                    "crafted_fiberglass": 2
                },
                "location": "LS Factory"
            },
            "Create Fiberglass Spool x10": {
                "reagents": {
                    "refined_planks": 10,
                    "scrap_plastic": 80,
                    "refined_glass": 40
                },
                "out_money": 0,
                "in_money": 50000,
                "aptitudes": {
                    "trucking.trucking": 18.1,
                    "physical.strength": 18.1,
                    "player.player": 18.1
                },
                "description": "Create spools of fiberglass",
                "products": {
                    "crafted_fiberglass": 20
                },
                "location": "LS Factory"
            },
            "Pick up pills crate x10": {
                "in_money": 100000,
                "aptitudes": [],
                "products": {
                    "illegal_crate": 10
                },
                "onSelect": false,
                "reagents": {
                    "refined_planks": 10,
                    "scrap_plastic": 50
                },
                "out_money": 0,
                "description": "Pills Crate x10",
                "onLeave": false,
                "onTransform": false,
                "cost": 10,
                "location": "Pop's Pills "
            },
            "Pick up pills crate": {
                "in_money": 10000,
                "aptitudes": [],
                "products": {
                    "illegal_crate": 1
                },
                "onSelect": false,
                "reagents": {
                    "refined_planks": 1,
                    "scrap_plastic": 5
                },
                "out_money": 0,
                "description": "Pills Crate",
                "onLeave": false,
                "onTransform": false,
                "cost": 1,
                "location": "Pop's Pills "
            }
        },
        "export": {
            "Export Scrap Plastic x100": {
                "permissionsText": "Plastic Export Contact Secret",
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 22.0,
                    "physical.strength": 22.0,
                    "player.player": 22.0
                },
                "products": [],
                "secret": true,
                "description": "Export the scrap plastic by hundreds",
                "reagents": {
                    "scrap_plastic": 100
                },
                "permissions": [
                    "sd.trucking.mckenzie.plastic"
                ],
                "out_money": 360000,
                "location": "McKenzie Export"
            },
            "Export Scrap Plastic x10": {
                "reagents": {
                    "scrap_plastic": 10
                },
                "out_money": 36000,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 2.2,
                    "physical.strength": 2.2,
                    "player.player": 2.2
                },
                "description": "Export the scrap plastic by tens",
                "products": [],
                "location": "McKenzie Export"
            },
            "Export Scrap Plastic": {
                "reagents": {
                    "scrap_plastic": 1
                },
                "out_money": 3600,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 0.22,
                    "physical.strength": 0.22,
                    "player.player": 0.22
                },
                "description": "Export the scrap plastic",
                "products": [],
                "location": "McKenzie Export"
            }
        },
        "key": "scrap_plastic"
    },
    "Scrap Tin": {
        "name": "Scrap Tin",
        "jobs": {
            "trucker": true
        },
        "value": 0,
        "pickuplocation": "",
        "craftlocation": "Sorting Facility",
        "usagelocation": "LS Foundry",
        "exportlocation": "",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Sort Recycled Trash x3": {
                "reagents": {
                    "recycled_trash": 3
                },
                "out_money": 0,
                "in_money": 75000,
                "aptitudes": {
                    "trucking.trucking": 9.81,
                    "physical.strength": 9.81,
                    "player.player": 9.81
                },
                "description": "Break down your recycled components",
                "products": {
                    "scrap_plastic": 24,
                    "scrap_aluminum": 12,
                    "scrap_tin": 12
                },
                "location": "Sorting Facility"
            },
            "Sort Recycled Trash": {
                "reagents": {
                    "recycled_trash": 1
                },
                "out_money": 0,
                "in_money": 25000,
                "aptitudes": {
                    "trucking.trucking": 3.27,
                    "physical.strength": 3.27,
                    "player.player": 3.27
                },
                "description": "Break down your recycled components",
                "products": {
                    "scrap_plastic": 8,
                    "scrap_aluminum": 4,
                    "scrap_tin": 4
                },
                "location": "Sorting Facility"
            }
        },
        "usage": {
            "Refine Tin x10": {
                "reagents": {
                    "scrap_tin": 20
                },
                "out_money": 0,
                "in_money": 10000,
                "aptitudes": {
                    "trucking.trucking": 2.6,
                    "physical.strength": 2.6,
                    "player.player": 2.6
                },
                "description": "Refine scrap tin into refined tin",
                "products": {
                    "refined_tin": 10
                },
                "location": "LS Foundry"
            },
            "Refine Bronze Alloy x1": {
                "reagents": {
                    "scrap_aluminum": 1,
                    "scrap_tin": 1,
                    "scrap_copper": 2
                },
                "out_money": 0,
                "in_money": 1000,
                "aptitudes": {
                    "trucking.trucking": 0.84,
                    "physical.strength": 0.84,
                    "player.player": 0.84
                },
                "description": "Mix multiple metals into bronze alloy",
                "products": {
                    "refined_bronze": 2
                },
                "location": "LS Foundry"
            },
            "Refine Bronze Alloy x10": {
                "reagents": {
                    "scrap_aluminum": 10,
                    "scrap_tin": 10,
                    "scrap_copper": 20
                },
                "out_money": 0,
                "in_money": 10000,
                "aptitudes": {
                    "trucking.trucking": 8.4,
                    "physical.strength": 8.4,
                    "player.player": 8.4
                },
                "description": "Mix multiple metals into bronze alloy",
                "products": {
                    "refined_bronze": 20
                },
                "location": "LS Foundry"
            },
            "Refine Tin x1": {
                "reagents": {
                    "scrap_tin": 2
                },
                "out_money": 0,
                "in_money": 1000,
                "aptitudes": {
                    "trucking.trucking": 0.26,
                    "physical.strength": 0.26,
                    "player.player": 0.26
                },
                "description": "Refine scrap tin into refined tin",
                "products": {
                    "refined_tin": 1
                },
                "location": "LS Foundry"
            },
            "Refine Tin x20": {
                "reagents": {
                    "scrap_tin": 40
                },
                "out_money": 0,
                "in_money": 20000,
                "aptitudes": {
                    "trucking.trucking": 5.2,
                    "physical.strength": 5.2,
                    "player.player": 5.2
                },
                "description": "Refine scrap tin into refined tin",
                "products": {
                    "refined_tin": 20
                },
                "location": "LS Foundry"
            }
        },
        "export": {},
        "key": "scrap_tin"
    },
    "Sulfur": {
        "name": "Sulfur",
        "jobs": {
            "trucker": true,
            "military": true
        },
        "value": 0,
        "pickuplocation": "",
        "craftlocation": "Water Treatment Plant",
        "usagelocation": "LS Foundry",
        "exportlocation": "",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Treat Waste Water": {
                "reagents": {
                    "petrochem_waste": 1
                },
                "out_money": 0,
                "in_money": 5000,
                "aptitudes": {
                    "trucking.trucking": 2.92,
                    "physical.strength": 2.92,
                    "player.player": 2.92
                },
                "description": "Treat Waste Water",
                "products": {
                    "petrochem_sulfur": 5
                },
                "location": "Water Treatment Plant"
            },
            "Treat Waste Water x2": {
                "reagents": {
                    "petrochem_waste": 2
                },
                "out_money": 0,
                "in_money": 10000,
                "aptitudes": {
                    "trucking.trucking": 5.84,
                    "physical.strength": 5.84,
                    "player.player": 5.84
                },
                "description": "Treat Waste Water x2",
                "products": {
                    "petrochem_sulfur": 10
                },
                "location": "Water Treatment Plant"
            }
        },
        "usage": {
            "Substitute Gold": {
                "permissionsText": "Substitute Gold Secret",
                "in_money": 1000,
                "aptitudes": {
                    "trucking.trucking": 10.0,
                    "physical.strength": 10.0,
                    "player.player": 10.0
                },
                "products": {
                    "scrap_gold": 40
                },
                "secret": true,
                "description": "Substitute Gold",
                "reagents": {
                    "petrochem_petrol": 2,
                    "petrochem_sulfur": 10,
                    "refined_bronze": 25
                },
                "permissions": [
                    "sd.trucking.foundry.gold"
                ],
                "out_money": 0,
                "location": "LS Foundry"
            },
            "Copper Alloy": {
                "permissionsText": "Copper Alloy Secret",
                "in_money": 10000,
                "aptitudes": {
                    "trucking.trucking": 10.0,
                    "physical.strength": 10.0,
                    "player.player": 10.0
                },
                "products": {
                    "refined_copper": 20
                },
                "secret": true,
                "description": "Copper Alloy",
                "reagents": {
                    "petrochem_sulfur": 10,
                    "scrap_ore": 20
                },
                "permissions": [
                    "sd.trucking.foundry.copper"
                ],
                "out_money": 0,
                "location": "LS Foundry"
            },
            "Create Explosives": {
                "reagents": {
                    "petrochem_sulfur": 10,
                    "petrochem_kerosene": 8
                },
                "out_money": 0,
                "in_money": 9500,
                "aptitudes": {
                    "trucking.trucking": 8.34,
                    "physical.strength": 8.34,
                    "player.player": 8.34
                },
                "description": "Create Explosives",
                "products": {
                    "military_explosives": 1
                },
                "location": "Military Workshop"
            }
        },
        "export": {},
        "key": "petrochem_sulfur"
    },
    "Titanium": {
        "name": "Titanium",
        "jobs": {
            "trucker": true,
            "military": true,
            "premium.trucking": true
        },
        "value": 75000,
        "pickuplocation": "",
        "craftlocation": "LS Foundry",
        "usagelocation": "Vehicle Factory",
        "exportlocation": "Military Workshop",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Refine Titanium x1": {
                "reagents": {
                    "military_titanium_ore": 1
                },
                "out_money": 0,
                "in_money": 1000,
                "aptitudes": {
                    "trucking.trucking": 0.87,
                    "physical.strength": 0.87,
                    "player.player": 0.87
                },
                "description": "Refine Titanium",
                "products": {
                    "military_titanium": 1
                },
                "location": "LS Foundry"
            },
            "Refine Titanium x10": {
                "reagents": {
                    "military_titanium_ore": 10
                },
                "out_money": 0,
                "in_money": 10000,
                "aptitudes": {
                    "trucking.trucking": 8.7,
                    "physical.strength": 8.7,
                    "player.player": 8.7
                },
                "description": "Refine Titanium x10",
                "products": {
                    "military_titanium": 10
                },
                "location": "LS Foundry"
            }
        },
        "usage": {
            "HVY Nightshark": {
                "reagents": {
                    "liquid_water": 1,
                    "mechanicals_wheels": 4,
                    "crafted_fiberglass": 25,
                    "military_titanium": 60,
                    "mechanicals_vehicle_framework": 2,
                    "mechanicals_battery": 2,
                    "mechanicals_chassis": 2,
                    "crafted_circuit": 12,
                    "refined_glass": 15,
                    "refined_amalgam": 40,
                    "liberty_military_goods": 4
                },
                "description": "HVY Nightshark",
                "out_money": 0,
                "in_money": 13780000,
                "aptitudes": {
                    "trucking.trucking": 13.0,
                    "physical.strength": 13.0,
                    "player.player": 12.0
                },
                "products": {
                    "vehicle_shipment|nightshark|HVY Nightshark|car": 1
                },
                "location": "Vehicle Factory"
            },
            "Titanium Jewelry": {
                "permissionsText": "Titanium Jewelry Secret",
                "in_money": 5000,
                "aptitudes": {
                    "trucking.trucking": 4.79,
                    "physical.strength": 4.79,
                    "player.player": 4.79
                },
                "products": {
                    "crafted_jewelry": 4
                },
                "secret": true,
                "description": "Combine valuable items into even more valuable jewelry.",
                "reagents": {
                    "military_titanium": 1,
                    "refined_gold": 4
                },
                "permissions": [
                    "sd.trucking.factory.jewelry"
                ],
                "out_money": 0,
                "location": "LS Factory"
            },
            "Titanium Reinforcement": {
                "permissionsText": "Titanium Reinforcement Secret",
                "in_money": 5000,
                "aptitudes": {
                    "trucking.trucking": 4.79,
                    "physical.strength": 4.79,
                    "player.player": 4.79
                },
                "products": {
                    "crafted_rebar": 2
                },
                "secret": true,
                "description": "Clean Waste Water",
                "reagents": {
                    "military_titanium": 6
                },
                "permissions": [
                    "sd.trucking.factory.titanium"
                ],
                "out_money": 0,
                "location": "LS Factory"
            },
            "Temporary Repair Shop": {
                "reagents": {
                    "military_titanium": 2,
                    "mechanicals_wheels": 2,
                    "pucargosmall": 2,
                    "mechanicals_chassis": 2
                },
                "out_money": 0,
                "in_money": 1500000,
                "aptitudes": {
                    "trucking.trucking": 13.0,
                    "physical.strength": 13.0,
                    "player.player": 12.0
                },
                "description": "Temporary Repair Shop",
                "products": {
                    "repair_shop": 1
                },
                "location": "Vehicle Parts"
            }
        },
        "export": {
            "Deliver Titanium": {
                "reagents": {
                    "military_titanium": 1
                },
                "out_money": 75000,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 2.65,
                    "physical.strength": 2.65,
                    "player.player": 2.65
                },
                "description": "Deliver Titanium",
                "products": [],
                "location": "Military Workshop"
            }
        },
        "key": "military_titanium"
    },
    "Titanium Ore": {
        "name": "Titanium Ore",
        "jobs": {
            "trucker": true,
            "military": true
        },
        "value": 0,
        "pickuplocation": "",
        "craftlocation": "GSD Mine",
        "usagelocation": "LS Foundry",
        "exportlocation": "",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Use Explosives": {
                "reagents": {
                    "military_explosives": 1
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": {
                    "trucking.trucking": 11.5,
                    "physical.strength": 11.5,
                    "player.player": 11.5
                },
                "description": "Use Explosives",
                "products": {
                    "military_titanium_ore": 4,
                    "scrap_gold": 10
                },
                "location": "GSD Mine"
            }
        },
        "usage": {
            "Refine Titanium x1": {
                "reagents": {
                    "military_titanium_ore": 1
                },
                "out_money": 0,
                "in_money": 1000,
                "aptitudes": {
                    "trucking.trucking": 0.87,
                    "physical.strength": 0.87,
                    "player.player": 0.87
                },
                "description": "Refine Titanium",
                "products": {
                    "military_titanium": 1
                },
                "location": "LS Foundry"
            },
            "Refine Titanium x10": {
                "reagents": {
                    "military_titanium_ore": 10
                },
                "out_money": 0,
                "in_money": 10000,
                "aptitudes": {
                    "trucking.trucking": 8.7,
                    "physical.strength": 8.7,
                    "player.player": 8.7
                },
                "description": "Refine Titanium x10",
                "products": {
                    "military_titanium": 10
                },
                "location": "LS Foundry"
            }
        },
        "export": {},
        "key": "military_titanium_ore"
    },
    "Tools": {
        "name": "Tools",
        "jobs": {
            "trucker": true,
            "premium.trucking": true
        },
        "value": 200,
        "pickuplocation": "Cargo Seller: Tools",
        "craftlocation": "",
        "usagelocation": "Vehicle Parts",
        "exportlocation": "Cargo Buyer: Tools",
        "permissions": "",
        "pickup": {
            "Buy: Tools": {
                "in_money": 100,
                "out_money": 0,
                "description": "Buy Tools that can be sold at the Tool Buyer<br/><em style='color:yellow'>Can only be stored in the Speedo Express and up to the MK4 trailer</em>",
                "aptitudes": [],
                "reagents": [],
                "products": {
                    "pucargosmall": 1
                },
                "location": "Cargo Seller: Tools"
            },
            "Buy: Tools x10": {
                "reagents": [],
                "permissionsText": "Trucking Level 5",
                "description": "Buy Tools in bulks of 10 that can be sold at the Tool Buyer<br/><em style='color:yellow'>Can only be stored in the Speedo Express and up to the MK4 trailer</em>",
                "out_money": 0,
                "in_money": 1000,
                "aptitudes": [],
                "permissions": [
                    "@trucking.trucking.>4"
                ],
                "products": {
                    "pucargosmall": 10
                },
                "location": "Cargo Seller: Tools"
            },
            "Buy: Tools x100": {
                "reagents": [],
                "permissionsText": "Trucking Level 10",
                "description": "Buy Tools in bulks of 100 that can be sold at the Tool Buyer<br/><em style='color:yellow'>Can only be stored in the Speedo Express and up to the MK4 trailer</em>",
                "out_money": 0,
                "in_money": 10000,
                "aptitudes": [],
                "permissions": [
                    "@trucking.trucking.>9"
                ],
                "products": {
                    "pucargosmall": 100
                },
                "location": "Cargo Seller: Tools"
            }
        },
        "crafting": {},
        "usage": {
            "Temporary Repair Shop": {
                "reagents": {
                    "military_titanium": 2,
                    "mechanicals_wheels": 2,
                    "pucargosmall": 2,
                    "mechanicals_chassis": 2
                },
                "out_money": 0,
                "in_money": 1500000,
                "aptitudes": {
                    "trucking.trucking": 13.0,
                    "physical.strength": 13.0,
                    "player.player": 12.0
                },
                "description": "Temporary Repair Shop",
                "products": {
                    "repair_shop": 1
                },
                "location": "Vehicle Parts"
            }
        },
        "export": {
            "Sell: Tools": {
                "in_money": 0,
                "out_money": 200,
                "description": "Sell your Tools",
                "aptitudes": {
                    "trucking.trucking": 0.1,
                    "physical.strength": 0.1,
                    "player.player": 0.1
                },
                "reagents": {
                    "pucargosmall": 1
                },
                "products": [],
                "location": "Cargo Buyer: Tools"
            },
            "Sell: Tools x100": {
                "in_money": 0,
                "out_money": 20000,
                "description": "Sell your Tools in bulks of 100",
                "aptitudes": {
                    "trucking.trucking": 10.0,
                    "physical.strength": 10.0,
                    "player.player": 10.0
                },
                "reagents": {
                    "pucargosmall": 100
                },
                "products": [],
                "location": "Cargo Buyer: Tools"
            },
            "Sell: Tools x10": {
                "in_money": 0,
                "out_money": 2000,
                "description": "Sell your Tools in bulks of 10",
                "aptitudes": {
                    "trucking.trucking": 1.0,
                    "physical.strength": 1.0,
                    "player.player": 1.0
                },
                "reagents": {
                    "pucargosmall": 10
                },
                "products": [],
                "location": "Cargo Buyer: Tools"
            }
        },
        "key": "pucargosmall"
    },
    "Toxic Waste": {
        "name": "Toxic Waste",
        "jobs": {
            "trucker": true,
            "petrochem": true
        },
        "value": 0,
        "pickuplocation": "Elysian Island Waste Deposit",
        "craftlocation": "",
        "usagelocation": "Filtering Plant",
        "exportlocation": "",
        "permissions": "",
        "pickup": {
            "<span sort='B'></span>Toxic Waste x3": {
                "reagents": [],
                "out_money": 0,
                "in_money": 0,
                "aptitudes": [],
                "description": "Pick up Toxic Waste, bring it to a filtering facility.",
                "products": {
                    "recycled_waste": 3
                },
                "location": "Elysian Island Waste Deposit"
            },
            "<span sort='A'></span>Toxic Waste": {
                "reagents": [],
                "out_money": 0,
                "in_money": 0,
                "aptitudes": [],
                "description": "Pick up Toxic Waste, bring it to a filtering facility.",
                "products": {
                    "recycled_waste": 1
                },
                "location": "Elysian Island Waste Deposit"
            },
            "Pick up Toxic Waste x3": {
                "reagents": [],
                "out_money": 0,
                "in_money": 0,
                "aptitudes": [],
                "description": "Pick up Toxic Waste, bring it to a filtering facility.",
                "products": {
                    "recycled_waste": 3
                },
                "location": "Chemical Laboratories"
            },
            "Pick up Toxic Waste": {
                "reagents": [],
                "out_money": 0,
                "in_money": 0,
                "aptitudes": [],
                "description": "Pick up Toxic Waste, bring it to a filtering facility.",
                "products": {
                    "recycled_waste": 1
                },
                "location": "Chemical Laboratories"
            }
        },
        "crafting": {},
        "usage": {
            "Filter Toxic Waste x3": {
                "reagents": {
                    "recycled_waste": 3
                },
                "out_money": 0,
                "in_money": 45000,
                "aptitudes": {
                    "trucking.trucking": 17.64,
                    "physical.strength": 17.64,
                    "player.player": 17.64
                },
                "description": "Filter waste materials out of the waste.",
                "products": {
                    "scrap_mercury": 6,
                    "scrap_lead": 6,
                    "scrap_acid": 12
                },
                "location": "Filtering Plant"
            },
            "Filter Toxic Waste": {
                "reagents": {
                    "recycled_waste": 1
                },
                "out_money": 0,
                "in_money": 15000,
                "aptitudes": {
                    "trucking.trucking": 5.88,
                    "physical.strength": 5.88,
                    "player.player": 5.88
                },
                "description": "Filter waste materials out of the waste.",
                "products": {
                    "scrap_mercury": 2,
                    "scrap_lead": 2,
                    "scrap_acid": 4
                },
                "location": "Filtering Plant"
            }
        },
        "export": {},
        "key": "recycled_waste"
    },
    "Traction Battery": {
        "name": "Traction Battery",
        "jobs": {
            "premium.trucking": true
        },
        "value": 0,
        "pickuplocation": "",
        "craftlocation": "Vehicle Parts",
        "usagelocation": "Vehicle Factory",
        "exportlocation": "",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Traction Battery": {
                "reagents": {
                    "mechanicals_battery": 6
                },
                "out_money": 0,
                "in_money": 120000,
                "aptitudes": {
                    "trucking.trucking": 13.0,
                    "physical.strength": 13.0,
                    "player.player": 12.0
                },
                "description": "Traction Battery",
                "products": {
                    "mechanicals_battery_evb": 1
                },
                "location": "Vehicle Parts"
            }
        },
        "usage": {
            "Coil Savanna": {
                "reagents": {
                    "mechanicals_battery": 1,
                    "crafted_fiberglass": 35,
                    "refined_amalgam": 50,
                    "crafted_circuit": 5,
                    "mechanicals_chassis": 1,
                    "refined_glass": 25,
                    "mechanicals_wheels": 4,
                    "mechanicals_battery_evb": 3,
                    "mechanicals_vehicle_framework": 1
                },
                "description": "Coil Savanna",
                "out_money": 0,
                "in_money": 8380000,
                "aptitudes": {
                    "trucking.trucking": 13.0,
                    "physical.strength": 13.0,
                    "player.player": 12.0
                },
                "products": {
                    "vehicle_shipment|savanna|Coil Savanna|car": 1
                },
                "location": "Vehicle Factory"
            }
        },
        "export": {},
        "key": "mechanicals_battery_evb"
    },
    "Treated Water": {
        "name": "Treated Water",
        "jobs": {
            "trucker": true,
            "liberty": true,
            "petrochem": true,
            "premium.trucking": true
        },
        "value": 0,
        "pickuplocation": "",
        "craftlocation": "LCFD",
        "usagelocation": "Filtering Plant",
        "exportlocation": "",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Tokens to Treated Water x3": {
                "reagents": {
                    "liberty_token": 3
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": [],
                "description": "Liberty Token -> Treated Water",
                "products": {
                    "liquid_water": 3
                },
                "location": "LCFD"
            },
            "Tokens to Treated Water": {
                "reagents": {
                    "liberty_token": 1
                },
                "out_money": 0,
                "in_money": 0,
                "aptitudes": [],
                "description": "Liberty Token -> Treated Water",
                "products": {
                    "liquid_water": 1
                },
                "location": "LCFD"
            },
            "Treat Unfiltered Water x2": {
                "reagents": {
                    "scrap_acid": 2,
                    "liquid_water_raw": 2
                },
                "out_money": 0,
                "in_money": 10000,
                "aptitudes": {
                    "trucking.trucking": 13.34,
                    "physical.strength": 13.34,
                    "player.player": 13.34
                },
                "description": "Filter out the germs of that nasty water",
                "products": {
                    "liquid_water": 2
                },
                "location": "Water Treatment Plant"
            },
            "Treat Unfiltered Water": {
                "reagents": {
                    "scrap_acid": 1,
                    "liquid_water_raw": 1
                },
                "out_money": 0,
                "in_money": 5000,
                "aptitudes": {
                    "trucking.trucking": 6.67,
                    "physical.strength": 6.67,
                    "player.player": 6.67
                },
                "description": "Filter out the germs of that nasty water",
                "products": {
                    "liquid_water": 1
                },
                "location": "Water Treatment Plant"
            },
            "Clean Waste Water": {
                "permissionsText": "Waste Water Cleaning Secret",
                "in_money": 5000,
                "aptitudes": {
                    "trucking.trucking": 6.67,
                    "physical.strength": 6.67,
                    "player.player": 6.67
                },
                "products": {
                    "liquid_water": 1
                },
                "secret": true,
                "description": "Clean Waste Water",
                "reagents": {
                    "petrochem_waste": 2
                },
                "permissions": [
                    "sd.trucking.treatment.waste"
                ],
                "out_money": 0,
                "location": "Water Treatment Plant"
            }
        },
        "usage": {
            "Mix Concrete x2": {
                "reagents": {
                    "liquid_water": 2,
                    "crafted_cement": 10
                },
                "out_money": 0,
                "in_money": 30000,
                "aptitudes": {
                    "trucking.trucking": 21.7,
                    "physical.strength": 21.7,
                    "player.player": 21.7
                },
                "description": "Mix a batch of concrete",
                "products": {
                    "crafted_concrete": 2
                },
                "location": "Filtering Plant"
            },
            "Mix Concrete": {
                "reagents": {
                    "liquid_water": 1,
                    "crafted_cement": 5
                },
                "out_money": 0,
                "in_money": 15000,
                "aptitudes": {
                    "trucking.trucking": 10.85,
                    "physical.strength": 10.85,
                    "player.player": 10.85
                },
                "description": "Mix a batch of concrete",
                "products": {
                    "crafted_concrete": 1
                },
                "location": "Filtering Plant"
            },
            "Refine Diluted Fuel": {
                "permissionsText": "Diluted Fuel Refining Secret",
                "in_money": 10250,
                "aptitudes": {
                    "trucking.trucking": 8.81,
                    "physical.strength": 8.81,
                    "player.player": 8.81
                },
                "products": {
                    "petrochem_diesel": 3,
                    "petrochem_petrol": 3,
                    "petrochem_kerosene": 20
                },
                "secret": true,
                "description": "Refine Diluted Fuel",
                "reagents": {
                    "petrochem_oil": 3,
                    "liquid_water": 2
                },
                "permissions": [
                    "sd.trucking.dilutedfuel"
                ],
                "out_money": 0,
                "location": "Refinery"
            },
            "HVY Nightshark": {
                "reagents": {
                    "liquid_water": 1,
                    "mechanicals_wheels": 4,
                    "crafted_fiberglass": 25,
                    "military_titanium": 60,
                    "mechanicals_vehicle_framework": 2,
                    "mechanicals_battery": 2,
                    "mechanicals_chassis": 2,
                    "crafted_circuit": 12,
                    "refined_glass": 15,
                    "refined_amalgam": 40,
                    "liberty_military_goods": 4
                },
                "description": "HVY Nightshark",
                "out_money": 0,
                "in_money": 13780000,
                "aptitudes": {
                    "trucking.trucking": 13.0,
                    "physical.strength": 13.0,
                    "player.player": 12.0
                },
                "products": {
                    "vehicle_shipment|nightshark|HVY Nightshark|car": 1
                },
                "location": "Vehicle Factory"
            },
            "Create Cardboard": {
                "permissionsText": "Cardboard Manufacturing Secret",
                "in_money": 5000,
                "aptitudes": {
                    "trucking.trucking": 3.81,
                    "physical.strength": 3.81,
                    "player.player": 3.81
                },
                "products": {
                    "crafted_cardboard": 5
                },
                "secret": true,
                "description": "Create Cardboard",
                "reagents": {
                    "tcargodust": 50,
                    "liquid_water": 1
                },
                "permissions": [
                    "sd.trucking.cardboard"
                ],
                "out_money": 0,
                "location": "LS Factory"
            }
        },
        "export": {},
        "key": "liquid_water"
    },
    "Unfiltered Water": {
        "name": "Unfiltered Water",
        "jobs": {
            "trucker": true
        },
        "value": 0,
        "pickuplocation": "Land Act Reservoir",
        "craftlocation": "",
        "usagelocation": "Water Treatment Plant",
        "exportlocation": "",
        "permissions": "",
        "pickup": {
            "Pick up Unfiltered Water x3": {
                "reagents": [],
                "out_money": 0,
                "in_money": 0,
                "aptitudes": [],
                "description": "Pick up some unfiltered water",
                "products": {
                    "liquid_water_raw": 3
                },
                "location": "Land Act Reservoir"
            },
            "Pick up Unfiltered Water": {
                "reagents": [],
                "out_money": 0,
                "in_money": 0,
                "aptitudes": [],
                "description": "Pick up some unfiltered water",
                "products": {
                    "liquid_water_raw": 1
                },
                "location": "Land Act Reservoir"
            }
        },
        "crafting": {},
        "usage": {
            "Treat Unfiltered Water x2": {
                "reagents": {
                    "scrap_acid": 2,
                    "liquid_water_raw": 2
                },
                "out_money": 0,
                "in_money": 10000,
                "aptitudes": {
                    "trucking.trucking": 13.34,
                    "physical.strength": 13.34,
                    "player.player": 13.34
                },
                "description": "Filter out the germs of that nasty water",
                "products": {
                    "liquid_water": 2
                },
                "location": "Water Treatment Plant"
            },
            "Treat Unfiltered Water": {
                "reagents": {
                    "scrap_acid": 1,
                    "liquid_water_raw": 1
                },
                "out_money": 0,
                "in_money": 5000,
                "aptitudes": {
                    "trucking.trucking": 6.67,
                    "physical.strength": 6.67,
                    "player.player": 6.67
                },
                "description": "Filter out the germs of that nasty water",
                "products": {
                    "liquid_water": 1
                },
                "location": "Water Treatment Plant"
            }
        },
        "export": {},
        "key": "liquid_water_raw"
    },
    "Upgrade Kit Voltic2": {
        "name": "Upgrade Kit Voltic2",
        "jobs": {
            "premium.trucking": true
        },
        "value": 0,
        "pickuplocation": "",
        "craftlocation": "Vehicle Factory",
        "usagelocation": "",
        "exportlocation": "",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Coil Rocket Voltic": {
                "reagents": {
                    "mechanicals_wheels": 4,
                    "crafted_fiberglass": 15,
                    "petrochem_kerosene": 100,
                    "mechanicals_chassis": 1,
                    "refined_amalgam": 50,
                    "refined_glass": 25,
                    "mechanicals_battery": 1,
                    "crafted_circuit": 5,
                    "mechanicals_vehicle_framework": 1
                },
                "description": "Coil Rocket Voltic",
                "out_money": 0,
                "in_money": 90110000,
                "aptitudes": {
                    "trucking.trucking": 13.0,
                    "physical.strength": 13.0,
                    "player.player": 12.0
                },
                "products": {
                    "upgrade_kit_voltic2": 1
                },
                "location": "Vehicle Factory"
            }
        },
        "usage": {},
        "export": {},
        "key": "upgrade_kit_voltic2"
    },
    "Vegetables": {
        "name": "Vegetables",
        "jobs": {
            "fridge": true
        },
        "value": 0,
        "pickuplocation": "Great Chaparral Farm",
        "craftlocation": "",
        "usagelocation": "Fridgit Co.",
        "exportlocation": "",
        "permissions": "",
        "pickup": {
            "Pick up Vegetables x10": {
                "reagents": [],
                "out_money": 0,
                "in_money": 0,
                "aptitudes": [],
                "description": "Pick up Vegetables",
                "products": {
                    "fridge_veggies": 10
                },
                "location": "Great Chaparral Farm"
            },
            "Pick up Vegetables": {
                "reagents": [],
                "out_money": 0,
                "in_money": 0,
                "aptitudes": [],
                "description": "Pick up Vegetables",
                "products": {
                    "fridge_veggies": 1
                },
                "location": "Great Chaparral Farm"
            }
        },
        "crafting": {},
        "usage": {
            "Create Airline Meal x10": {
                "reagents": {
                    "fridge_veggies": 10,
                    "fridge_meat": 10,
                    "fridge_dairy": 10
                },
                "out_money": 0,
                "in_money": 25000,
                "aptitudes": {
                    "trucking.trucking": 52.4,
                    "physical.strength": 52.4,
                    "player.player": 52.4
                },
                "description": "Create Airline Meal x10",
                "products": {
                    "fridge_airline_meal": 40
                },
                "location": "Fridgit Co."
            },
            "Create Vegetables Shipment": {
                "reagents": {
                    "fridge_veggies": 4
                },
                "out_money": 0,
                "in_money": 2500,
                "aptitudes": {
                    "trucking.trucking": 3.74,
                    "physical.strength": 3.74,
                    "player.player": 3.74
                },
                "description": "Veggies to Food Shipment",
                "products": {
                    "fridge_store_delivery": 5
                },
                "location": "Fridgit Co."
            },
            "Create Vegetables Shipment x10": {
                "reagents": {
                    "fridge_veggies": 40
                },
                "out_money": 0,
                "in_money": 25000,
                "aptitudes": {
                    "trucking.trucking": 37.4,
                    "physical.strength": 37.4,
                    "player.player": 37.4
                },
                "description": "Veggies to Food Shipment x10",
                "products": {
                    "fridge_store_delivery": 50
                },
                "location": "Fridgit Co."
            },
            "Create Airline Meal": {
                "reagents": {
                    "fridge_veggies": 1,
                    "fridge_meat": 1,
                    "fridge_dairy": 1
                },
                "out_money": 0,
                "in_money": 2500,
                "aptitudes": {
                    "trucking.trucking": 5.24,
                    "physical.strength": 5.24,
                    "player.player": 5.24
                },
                "description": "Create Airline Meal",
                "products": {
                    "fridge_airline_meal": 4
                },
                "location": "Fridgit Co."
            }
        },
        "export": {},
        "key": "fridge_veggies"
    },
    "Vehicle Framework": {
        "name": "Vehicle Framework",
        "jobs": {
            "trucker": true,
            "premium.trucking": true
        },
        "value": 350000,
        "pickuplocation": "",
        "craftlocation": "Vehicle Parts",
        "usagelocation": "Vehicle Factory",
        "exportlocation": "LS Port Export",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Vehicle Framework": {
                "reagents": {
                    "refined_amalgam": 25
                },
                "out_money": 0,
                "in_money": 250000,
                "aptitudes": {
                    "trucking.trucking": 13.0,
                    "physical.strength": 13.0,
                    "player.player": 12.0
                },
                "description": "Vehicle Framework",
                "products": {
                    "mechanicals_vehicle_framework": 1
                },
                "location": "Vehicle Parts"
            }
        },
        "usage": {
            "HVY Nightshark": {
                "reagents": {
                    "liquid_water": 1,
                    "mechanicals_wheels": 4,
                    "crafted_fiberglass": 25,
                    "military_titanium": 60,
                    "mechanicals_vehicle_framework": 2,
                    "mechanicals_battery": 2,
                    "mechanicals_chassis": 2,
                    "crafted_circuit": 12,
                    "refined_glass": 15,
                    "refined_amalgam": 40,
                    "liberty_military_goods": 4
                },
                "description": "HVY Nightshark",
                "out_money": 0,
                "in_money": 13780000,
                "aptitudes": {
                    "trucking.trucking": 13.0,
                    "physical.strength": 13.0,
                    "player.player": 12.0
                },
                "products": {
                    "vehicle_shipment|nightshark|HVY Nightshark|car": 1
                },
                "location": "Vehicle Factory"
            },
            "Karin Futo": {
                "reagents": {
                    "mechanicals_chassis": 1,
                    "mechanicals_wheels": 4,
                    "crafted_fiberglass": 15,
                    "refined_amalgam": 50,
                    "crafted_circuit": 5,
                    "mechanicals_battery": 1,
                    "refined_glass": 25,
                    "mechanicals_vehicle_framework": 1
                },
                "description": "Karin Futo",
                "out_money": 0,
                "in_money": 220000,
                "aptitudes": {
                    "trucking.trucking": 13.0,
                    "physical.strength": 13.0,
                    "player.player": 12.0
                },
                "products": {
                    "vehicle_shipment|futo|Karin Futo|car": 1
                },
                "location": "Vehicle Factory"
            },
            "Coil Savanna": {
                "reagents": {
                    "mechanicals_battery": 1,
                    "crafted_fiberglass": 35,
                    "refined_amalgam": 50,
                    "crafted_circuit": 5,
                    "mechanicals_chassis": 1,
                    "refined_glass": 25,
                    "mechanicals_wheels": 4,
                    "mechanicals_battery_evb": 3,
                    "mechanicals_vehicle_framework": 1
                },
                "description": "Coil Savanna",
                "out_money": 0,
                "in_money": 8380000,
                "aptitudes": {
                    "trucking.trucking": 13.0,
                    "physical.strength": 13.0,
                    "player.player": 12.0
                },
                "products": {
                    "vehicle_shipment|savanna|Coil Savanna|car": 1
                },
                "location": "Vehicle Factory"
            },
            "Annis ZR-350": {
                "reagents": {
                    "mechanicals_chassis": 1,
                    "mechanicals_wheels": 4,
                    "crafted_fiberglass": 15,
                    "refined_amalgam": 50,
                    "crafted_circuit": 5,
                    "mechanicals_battery": 1,
                    "refined_glass": 25,
                    "mechanicals_vehicle_framework": 1
                },
                "description": "Annis ZR-350",
                "out_money": 0,
                "in_money": 1620000,
                "aptitudes": {
                    "trucking.trucking": 13.0,
                    "physical.strength": 13.0,
                    "player.player": 12.0
                },
                "products": {
                    "vehicle_shipment|zr350|Annis ZR-350|car": 1
                },
                "location": "Vehicle Factory"
            },
            "Hijak Vertice": {
                "reagents": {
                    "mechanicals_chassis": 1,
                    "mechanicals_wheels": 4,
                    "crafted_fiberglass": 15,
                    "refined_amalgam": 50,
                    "crafted_circuit": 5,
                    "mechanicals_battery": 1,
                    "refined_glass": 25,
                    "mechanicals_vehicle_framework": 1
                },
                "description": "Hijak Vertice",
                "out_money": 0,
                "in_money": 320000,
                "aptitudes": {
                    "trucking.trucking": 13.0,
                    "physical.strength": 13.0,
                    "player.player": 12.0
                },
                "products": {
                    "vehicle_shipment|vertice|Hijak Vertice|car": 1
                },
                "location": "Vehicle Factory"
            },
            "Coil Rocket Voltic": {
                "reagents": {
                    "mechanicals_wheels": 4,
                    "crafted_fiberglass": 15,
                    "petrochem_kerosene": 100,
                    "mechanicals_chassis": 1,
                    "refined_amalgam": 50,
                    "refined_glass": 25,
                    "mechanicals_battery": 1,
                    "crafted_circuit": 5,
                    "mechanicals_vehicle_framework": 1
                },
                "description": "Coil Rocket Voltic",
                "out_money": 0,
                "in_money": 90110000,
                "aptitudes": {
                    "trucking.trucking": 13.0,
                    "physical.strength": 13.0,
                    "player.player": 12.0
                },
                "products": {
                    "upgrade_kit_voltic2": 1
                },
                "location": "Vehicle Factory"
            },
            "Landstalker XL": {
                "permissionsText": "Landstalker XL Blueprints Secret",
                "in_money": 32000000,
                "aptitudes": {
                    "trucking.trucking": 130.0,
                    "physical.strength": 130.0,
                    "player.player": 120.0
                },
                "products": {
                    "vehicle_shipment|landstalker2|Landstalker XL|car": 1
                },
                "secret": true,
                "description": "Landstalker XL",
                "reagents": {
                    "mechanicals_chassis": 1,
                    "mechanicals_wheels": 4,
                    "crafted_fiberglass": 30,
                    "refined_amalgam": 100,
                    "crafted_circuit": 10,
                    "mechanicals_battery": 2,
                    "refined_glass": 50,
                    "mechanicals_vehicle_framework": 1
                },
                "permissions": [
                    "sd.trucking.shipment.landstalker2"
                ],
                "out_money": 0,
                "location": "Vehicle Factory"
            }
        },
        "export": {
            "Export Vehicle Framework": {
                "reagents": {
                    "mechanicals_vehicle_framework": 1
                },
                "out_money": 350000,
                "in_money": 0,
                "aptitudes": [],
                "description": "Export Vehicle Framework",
                "products": [],
                "location": "LS Port Export"
            }
        },
        "key": "mechanicals_vehicle_framework"
    },
    "Waste Water": {
        "name": "Waste Water",
        "jobs": {
            "petrochem": true,
            "trucker": true
        },
        "value": 0,
        "pickuplocation": "",
        "craftlocation": "Refinery",
        "usagelocation": "Water Treatment Plant",
        "exportlocation": "",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Refine Raw Gas x2": {
                "reagents": {
                    "petrochem_gas": 2
                },
                "out_money": 0,
                "in_money": 20500,
                "aptitudes": {
                    "trucking.trucking": 12.64,
                    "physical.strength": 12.64,
                    "player.player": 12.64
                },
                "description": "Refine Raw Gas x2",
                "products": {
                    "petrochem_propane": 4,
                    "military_chemicals": 4,
                    "petrochem_waste": 2
                },
                "location": "Refinery"
            },
            "Refine Raw Gas": {
                "reagents": {
                    "petrochem_gas": 1
                },
                "out_money": 0,
                "in_money": 10250,
                "aptitudes": {
                    "trucking.trucking": 6.32,
                    "physical.strength": 6.32,
                    "player.player": 6.32
                },
                "description": "Refine Raw Gas",
                "products": {
                    "petrochem_propane": 2,
                    "military_chemicals": 2,
                    "petrochem_waste": 1
                },
                "location": "Refinery"
            }
        },
        "usage": {
            "Treat Waste Water": {
                "reagents": {
                    "petrochem_waste": 1
                },
                "out_money": 0,
                "in_money": 5000,
                "aptitudes": {
                    "trucking.trucking": 2.92,
                    "physical.strength": 2.92,
                    "player.player": 2.92
                },
                "description": "Treat Waste Water",
                "products": {
                    "petrochem_sulfur": 5
                },
                "location": "Water Treatment Plant"
            },
            "Treat Waste Water x2": {
                "reagents": {
                    "petrochem_waste": 2
                },
                "out_money": 0,
                "in_money": 10000,
                "aptitudes": {
                    "trucking.trucking": 5.84,
                    "physical.strength": 5.84,
                    "player.player": 5.84
                },
                "description": "Treat Waste Water x2",
                "products": {
                    "petrochem_sulfur": 10
                },
                "location": "Water Treatment Plant"
            },
            "Clean Waste Water": {
                "permissionsText": "Waste Water Cleaning Secret",
                "in_money": 5000,
                "aptitudes": {
                    "trucking.trucking": 6.67,
                    "physical.strength": 6.67,
                    "player.player": 6.67
                },
                "products": {
                    "liquid_water": 1
                },
                "secret": true,
                "description": "Clean Waste Water",
                "reagents": {
                    "petrochem_waste": 2
                },
                "permissions": [
                    "sd.trucking.treatment.waste"
                ],
                "out_money": 0,
                "location": "Water Treatment Plant"
            }
        },
        "export": {},
        "key": "petrochem_waste"
    },
    "Wheels": {
        "name": "Wheels",
        "jobs": {
            "premium.trucking": true
        },
        "value": 0,
        "pickuplocation": "",
        "craftlocation": "Vehicle Parts",
        "usagelocation": "Vehicle Factory",
        "exportlocation": "",
        "permissions": "",
        "pickup": {},
        "crafting": {
            "Wheels": {
                "reagents": {
                    "mechanicals_rubber": 10,
                    "refined_aluminum": 1
                },
                "out_money": 0,
                "in_money": 20000,
                "aptitudes": {
                    "trucking.trucking": 13.0,
                    "physical.strength": 13.0,
                    "player.player": 12.0
                },
                "description": "Wheels",
                "products": {
                    "mechanicals_wheels": 1
                },
                "location": "Vehicle Parts"
            }
        },
        "usage": {
            "HVY Nightshark": {
                "reagents": {
                    "liquid_water": 1,
                    "mechanicals_wheels": 4,
                    "crafted_fiberglass": 25,
                    "military_titanium": 60,
                    "mechanicals_vehicle_framework": 2,
                    "mechanicals_battery": 2,
                    "mechanicals_chassis": 2,
                    "crafted_circuit": 12,
                    "refined_glass": 15,
                    "refined_amalgam": 40,
                    "liberty_military_goods": 4
                },
                "description": "HVY Nightshark",
                "out_money": 0,
                "in_money": 13780000,
                "aptitudes": {
                    "trucking.trucking": 13.0,
                    "physical.strength": 13.0,
                    "player.player": 12.0
                },
                "products": {
                    "vehicle_shipment|nightshark|HVY Nightshark|car": 1
                },
                "location": "Vehicle Factory"
            },
            "Karin Futo": {
                "reagents": {
                    "mechanicals_chassis": 1,
                    "mechanicals_wheels": 4,
                    "crafted_fiberglass": 15,
                    "refined_amalgam": 50,
                    "crafted_circuit": 5,
                    "mechanicals_battery": 1,
                    "refined_glass": 25,
                    "mechanicals_vehicle_framework": 1
                },
                "description": "Karin Futo",
                "out_money": 0,
                "in_money": 220000,
                "aptitudes": {
                    "trucking.trucking": 13.0,
                    "physical.strength": 13.0,
                    "player.player": 12.0
                },
                "products": {
                    "vehicle_shipment|futo|Karin Futo|car": 1
                },
                "location": "Vehicle Factory"
            },
            "Coil Savanna": {
                "reagents": {
                    "mechanicals_battery": 1,
                    "crafted_fiberglass": 35,
                    "refined_amalgam": 50,
                    "crafted_circuit": 5,
                    "mechanicals_chassis": 1,
                    "refined_glass": 25,
                    "mechanicals_wheels": 4,
                    "mechanicals_battery_evb": 3,
                    "mechanicals_vehicle_framework": 1
                },
                "description": "Coil Savanna",
                "out_money": 0,
                "in_money": 8380000,
                "aptitudes": {
                    "trucking.trucking": 13.0,
                    "physical.strength": 13.0,
                    "player.player": 12.0
                },
                "products": {
                    "vehicle_shipment|savanna|Coil Savanna|car": 1
                },
                "location": "Vehicle Factory"
            },
            "Annis ZR-350": {
                "reagents": {
                    "mechanicals_chassis": 1,
                    "mechanicals_wheels": 4,
                    "crafted_fiberglass": 15,
                    "refined_amalgam": 50,
                    "crafted_circuit": 5,
                    "mechanicals_battery": 1,
                    "refined_glass": 25,
                    "mechanicals_vehicle_framework": 1
                },
                "description": "Annis ZR-350",
                "out_money": 0,
                "in_money": 1620000,
                "aptitudes": {
                    "trucking.trucking": 13.0,
                    "physical.strength": 13.0,
                    "player.player": 12.0
                },
                "products": {
                    "vehicle_shipment|zr350|Annis ZR-350|car": 1
                },
                "location": "Vehicle Factory"
            },
            "Hijak Vertice": {
                "reagents": {
                    "mechanicals_chassis": 1,
                    "mechanicals_wheels": 4,
                    "crafted_fiberglass": 15,
                    "refined_amalgam": 50,
                    "crafted_circuit": 5,
                    "mechanicals_battery": 1,
                    "refined_glass": 25,
                    "mechanicals_vehicle_framework": 1
                },
                "description": "Hijak Vertice",
                "out_money": 0,
                "in_money": 320000,
                "aptitudes": {
                    "trucking.trucking": 13.0,
                    "physical.strength": 13.0,
                    "player.player": 12.0
                },
                "products": {
                    "vehicle_shipment|vertice|Hijak Vertice|car": 1
                },
                "location": "Vehicle Factory"
            },
            "Coil Rocket Voltic": {
                "reagents": {
                    "mechanicals_wheels": 4,
                    "crafted_fiberglass": 15,
                    "petrochem_kerosene": 100,
                    "mechanicals_chassis": 1,
                    "refined_amalgam": 50,
                    "refined_glass": 25,
                    "mechanicals_battery": 1,
                    "crafted_circuit": 5,
                    "mechanicals_vehicle_framework": 1
                },
                "description": "Coil Rocket Voltic",
                "out_money": 0,
                "in_money": 90110000,
                "aptitudes": {
                    "trucking.trucking": 13.0,
                    "physical.strength": 13.0,
                    "player.player": 12.0
                },
                "products": {
                    "upgrade_kit_voltic2": 1
                },
                "location": "Vehicle Factory"
            },
            "Landstalker XL": {
                "permissionsText": "Landstalker XL Blueprints Secret",
                "in_money": 32000000,
                "aptitudes": {
                    "trucking.trucking": 130.0,
                    "physical.strength": 130.0,
                    "player.player": 120.0
                },
                "products": {
                    "vehicle_shipment|landstalker2|Landstalker XL|car": 1
                },
                "secret": true,
                "description": "Landstalker XL",
                "reagents": {
                    "mechanicals_chassis": 1,
                    "mechanicals_wheels": 4,
                    "crafted_fiberglass": 30,
                    "refined_amalgam": 100,
                    "crafted_circuit": 10,
                    "mechanicals_battery": 2,
                    "refined_glass": 50,
                    "mechanicals_vehicle_framework": 1
                },
                "permissions": [
                    "sd.trucking.shipment.landstalker2"
                ],
                "out_money": 0,
                "location": "Vehicle Factory"
            },
            "Temporary Repair Shop": {
                "reagents": {
                    "military_titanium": 2,
                    "mechanicals_wheels": 2,
                    "pucargosmall": 2,
                    "mechanicals_chassis": 2
                },
                "out_money": 0,
                "in_money": 1500000,
                "aptitudes": {
                    "trucking.trucking": 13.0,
                    "physical.strength": 13.0,
                    "player.player": 12.0
                },
                "description": "Temporary Repair Shop",
                "products": {
                    "repair_shop": 1
                },
                "location": "Vehicle Parts"
            }
        },
        "export": {},
        "key": "mechanicals_wheels"
    }
}