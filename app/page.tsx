"use client"
import VehicleFilter from "@/app/components/vehicle/VehicleFilter";
import {fetcherResult} from "@/app/utils";
import {Vehicle} from "@/app/components/vehicle/IVehicle";
import useSWR from "swr";
import Loading from "@/app/loading";
import Error from "@/app/components/Error";


export default function Home() {
    const {data: vehicleMakes, error} = useSWR<Vehicle[] | null>(
        `https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json`,
        fetcherResult<Vehicle[]>,
        {suspense: true, fallbackData: null}
    );

    return (
        <div className="container-home">
            <div className="container-home-context">
                <h1>Filter Vehicles</h1>
                {vehicleMakes
                    ? <VehicleFilter vehicleMakes={vehicleMakes}/>
                    : error ? <Error/> : <Loading/>
                }
            </div>
        </div>);
}