import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage game tokens, rewards, and achievements.</p>
      </div>

      <Tabs defaultValue="tokens" className="space-y-6">
        <TabsList>
          <TabsTrigger value="tokens">Token Management</TabsTrigger>
          <TabsTrigger value="rewards">Reward Configuration</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
        </TabsList>

        <TabsContent value="tokens" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Token Management</CardTitle>
              <CardDescription>Mint and burn tokens, manage token supply.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Mint Tokens</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">Mint new KEY tokens to a player's wallet.</p>
                    <div className="flex justify-end">
                      <div className="w-full max-w-xs">
                        {/* Mint form will go here */}
                        <p className="text-sm text-muted-foreground text-center">
                          Connect wallet with admin role to mint tokens
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Burn Tokens</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">Burn KEY tokens from a player's wallet.</p>
                    <div className="flex justify-end">
                      <div className="w-full max-w-xs">
                        {/* Burn form will go here */}
                        <p className="text-sm text-muted-foreground text-center">
                          Connect wallet with admin role to burn tokens
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rewards" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reward Configuration</CardTitle>
              <CardDescription>Configure daily rewards and consecutive day multipliers.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Base Reward</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">Set the base daily reward amount.</p>
                    <div className="flex justify-end">
                      <div className="w-full max-w-xs">
                        {/* Base reward form will go here */}
                        <p className="text-sm text-muted-foreground text-center">
                          Connect wallet with admin role to configure rewards
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Max Consecutive Days</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Set the maximum consecutive days for reward multipliers.
                    </p>
                    <div className="flex justify-end">
                      <div className="w-full max-w-xs">
                        {/* Max consecutive days form will go here */}
                        <p className="text-sm text-muted-foreground text-center">
                          Connect wallet with admin role to configure rewards
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Achievement Management</CardTitle>
              <CardDescription>Create and manage achievements.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Create Achievement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Create a new achievement for players to unlock.
                    </p>
                    <div className="flex justify-end">
                      <div className="w-full max-w-xs">
                        {/* Create achievement form will go here */}
                        <p className="text-sm text-muted-foreground text-center">
                          Connect wallet with admin role to create achievements
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Unlock Achievement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">Unlock an achievement for a player.</p>
                    <div className="flex justify-end">
                      <div className="w-full max-w-xs">
                        {/* Unlock achievement form will go here */}
                        <p className="text-sm text-muted-foreground text-center">
                          Connect wallet with admin role to unlock achievements
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage user roles and permissions.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Grant Role</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">Grant a role to a user.</p>
                    <div className="flex justify-end">
                      <div className="w-full max-w-xs">
                        {/* Grant role form will go here */}
                        <p className="text-sm text-muted-foreground text-center">
                          Connect wallet with admin role to grant roles
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Revoke Role</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">Revoke a role from a user.</p>
                    <div className="flex justify-end">
                      <div className="w-full max-w-xs">
                        {/* Revoke role form will go here */}
                        <p className="text-sm text-muted-foreground text-center">
                          Connect wallet with admin role to revoke roles
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

