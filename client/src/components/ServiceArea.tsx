import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ServiceArea() {
  const serviceAreas = [
    "Downtown",
    "North End",
    "South Side",
    "West Hills",
    "East Valley",
    "Riverside",
    "Oak Heights",
    "Pine Grove",
    "Meadowlands",
    "Lakeside",
    "Sunset District",
    "Green Valley",
  ];

  return (
    <Card className="bg-white rounded-lg shadow-md overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold text-primary">Service Areas</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">
          We proudly serve the following areas with our professional landscaping and painting services:
        </p>
        
        <div className="grid grid-cols-2 gap-2">
          {serviceAreas.map((area, index) => (
            <div key={index} className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-primary mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-gray-700">{area}</span>
            </div>
          ))}
        </div>
        
        <div className="mt-6 bg-primary/5 p-4 rounded">
          <p className="text-center text-gray-600">
            Don't see your area listed? <span className="font-semibold">Contact us</span> to check if we serve your location.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
