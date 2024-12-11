"use client"
import useSWR from 'swr';
import {fetcherResult} from "@/app/utils";
import Loading from "@/app/loading";
import {VehicleDetail} from "@/app/components/vehicle/IVehicle";
import {nanoid} from "nanoid";
import './style.css'
import Error from "@/app/components/Error";

interface ModelSearchParams {
    makeId: number;
    year: number;
}

export default function ModelsList({makeId, year}: ModelSearchParams) {
    const {data: vehicles, isLoading, error} = useSWR(
        `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`,
        fetcherResult<VehicleDetail[]>
    );

    if (isLoading) {
        return <Loading/>
    }
    if (error) {
        return <Error/>
    }

    if (vehicles && vehicles.length === 0) {
        return (
            <div className="container-not-found">
                <p className="text-not-found">No vehicle models available for Make ID {makeId} in Year {year}</p>
            </div>
        );
    }
    return (
        <ul className="space-y-6">
            {vehicles && vehicles.map((vehicle: VehicleDetail) => (
                <li key={nanoid()}
                    className="list-card"
                >
                    <div className="list-header">
                        <h3>{vehicle.Model_Name}</h3>
                        <span>{vehicle.Model_ID}</span>
                    </div>
                    <div className="list-footer">
                        <span>Year: {year}</span>
                        <span>Make ID: {makeId}</span>
                    </div>
                </li>
            ))}
        </ul>

    );
}
