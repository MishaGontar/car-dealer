export const fetcherResult = <T>(url: string): Promise<T> =>
    fetch(url)
        .then((res) => res.json())
        .then(data => data.Results)

const currentYear = new Date().getFullYear()
export const years: number[] = Array.from({length: currentYear - 2014}, (_, i) => 2015 + i);
