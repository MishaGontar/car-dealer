"use client"
import Link from "next/link";
import {Vehicle} from "@/app/components/vehicle/IVehicle";
import {useState} from "react";
import Select from "@/app/components/select/Select";
import './style.css'
import {years} from "@/app/utils";

export interface VehicleFilterProps {
    vehicleMakes: Vehicle[],
}

export default function VehicleFilter({vehicleMakes}: VehicleFilterProps) {
    const [selectedMake, setSelectedMake] = useState<string | number>('');
    const [selectedYear, setSelectedYear] = useState<string | number>('');
    const buttonClass = `button ${selectedMake && selectedYear ? 'button-active' : 'button-disable'}`

    if (vehicleMakes.length === 0) {
        return <div>Can`t find any vehicle</div>
    }

    return (
        <>
            <Select
                id="vehicle-make"
                label="Vehicle Make"
                value={selectedMake}
                options={vehicleMakes}
                onChange={setSelectedMake}
                displayValue={(make) => make.MakeName}
                valueKey={(make) => make.MakeId}
            />

            <Select
                id="model-year"
                label="Model Year"
                value={selectedYear}
                options={years}
                onChange={setSelectedYear}
                displayValue={(year) => year.toString()}
                valueKey={(year) => year.toString()}
            />

            <Link
                href={selectedMake && selectedYear ? `/result/${selectedMake}/${selectedYear}` : ''}
                passHref
            >
                <button
                    className={buttonClass}
                    disabled={!selectedMake || !selectedYear}
                >
                    Next
                </button>
            </Link>
        </>
    )
}