import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Leaf } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUserData, useLogActivity, useSocialComparison, useChallenges } from '../lib/api';

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const userId = "user123"; // Replace with actual user ID from authentication
  const { data: userData, isLoading: isUserDataLoading } = useUserData(userId);
  const { data: socialData, isLoading: isSocialDataLoading } = useSocialComparison(userId);
  const { data: challengesData, isLoading: isChallengesLoading } = useChallenges();
  const logActivity = useLogActivity();

  const handleLogActivity = (activityData) => {
    logActivity.mutate(activityData);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {(isUserDataLoading || isSocialDataLoading || isChallengesLoading) && (
        <div className="text-center py-10">Loading...</div>
      )}
      {!isUserDataLoading && !isSocialDataLoading && !isChallengesLoading && (
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
              {userData && userData.footprintHistory && (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={userData.footprintHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="footprint" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              )}
              {userData && userData.suggestions && (
                <div className="mt-4">
                  <h3 className="font-semibold">Suggestions for Improvement:</h3>
                  <ul className="list-disc list-inside">
                    {userData.suggestions.map((suggestion, index) => (
                      <li key={index}>{suggestion}</li>
                    ))}
                  </ul>
                </div>
              )}
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
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                handleLogActivity(Object.fromEntries(formData));
              }} className="space-y-4">
                <div>
                  <Label htmlFor="activity-type">Activity Type</Label>
                  <Select>
                    <SelectTrigger id="activity-type">
                      <SelectValue placeholder="Select activity type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="transportation">Transportation</SelectItem>
                      <SelectItem value="energy">Energy Use</SelectItem>
                      <SelectItem value="food">Food Consumption</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="activity-details">Activity Details</Label>
                  <Input id="activity-details" placeholder="e.g., 10 miles by car" />
                </div>
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" />
                </div>
                <Button type="submit">Log Activity</Button>
              </form>
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
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Your Ranking</h3>
                  <p>You are in the top {socialData.percentile}% of eco-friendly users!</p>
                </div>
                <div>
                  <h3 className="font-semibold">Leaderboard</h3>
                  <ul className="list-disc list-inside">
                    {socialData.leaderboard.map((user, index) => (
                      <li key={index}>{user.name}: {user.score} points</li>
                    ))}
                  </ul>
                </div>
              </div>
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
              <ul className="space-y-4">
                {challengesData.map((challenge, index) => (
                  <li key={index} className="border p-4 rounded-md">
                    <h3 className="font-semibold">{challenge.title}</h3>
                    <p>{challenge.description}</p>
                    <Button className="mt-2" onClick={() => handleJoinChallenge(challenge.id)}>
                      Join Challenge
                    </Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
