import ModelsList from "@/app/components/model/ModelList";
import Link from "next/link";
import './style.css'
import {fetcherResult, years} from "@/app/utils";
import {Vehicle} from "@/app/components/vehicle/IVehicle";
import {notFound} from "next/navigation";


export async function generateStaticParams() {
    try {
        const list: Vehicle[] = await fetcherResult<Vehicle[]>(
            `https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json`
        );

        return list.flatMap(l =>
            years.map(year => ({
                makeId: l.MakeId.toString(),
                year: year.toString(),
            }))
        );
    } catch (error) {
        console.error("Error fetching vehicle makes:", error);
        return [];
    }
}

interface ResultProps {
    params: {
        makeId: number;
        year: number;
    };
}


export default async function Result({params}: ResultProps) {
    const {makeId, year} = await params;

    if (!makeId || !year) {
        notFound();
    }

    return (
        <div className="container-result">
            <div className="context">
                <div className="container-header">
                    <h1 className="text-2xl font-bold mb-4">
                        Vehicle Models for Make ID {makeId} in Year {year}
                    </h1>
                    <Link href='/' className="text-blue-600"> Back to filter</Link>
                </div>
                <ModelsList makeId={makeId} year={year}/>
            </div>
        </div>
    );
}


