import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Leaf } from 'lucide-react';

const mockData = [
  { date: '2023-01-01', footprint: 10 },
  { date: '2023-02-01', footprint: 8 },
  { date: '2023-03-01', footprint: 9 },
  { date: '2023-04-01', footprint: 7 },
  { date: '2023-05-01', footprint: 6 },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-green-600 flex items-center justify-center">
          <Leaf className="mr-2" /> EcoTracker
        </h1>
        <p className="text-xl text-gray-600">Monitor and reduce your carbon footprint</p>
      </header>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="log">Log Activity</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard">
          <Card>
            <CardHeader>
              <CardTitle>Your Carbon Footprint</CardTitle>
              <CardDescription>Track your progress over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mockData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="footprint" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-4">
                <h3 className="font-semibold">Suggestions for Improvement:</h3>
                <ul className="list-disc list-inside">
                  <li>Use public transportation more often</li>
                  <li>Reduce meat consumption</li>
                  <li>Switch to energy-efficient appliances</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="log">
          <Card>
            <CardHeader>
              <CardTitle>Log Your Daily Activities</CardTitle>
              <CardDescription>Record your transportation, energy use, and food habits</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Activity logging form will be implemented here</p>
              <Button className="mt-4">Log Activity</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="social">
          <Card>
            <CardHeader>
              <CardTitle>Social Comparison</CardTitle>
              <CardDescription>See how you compare to your friends</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Social comparison features will be implemented here</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="challenges">
          <Card>
            <CardHeader>
              <CardTitle>Eco-Friendly Challenges</CardTitle>
              <CardDescription>Participate in challenges to reduce your carbon footprint</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Eco-friendly challenges will be listed here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
