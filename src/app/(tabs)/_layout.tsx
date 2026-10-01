import { TabList, Tabs, TabSlot, TabTrigger } from 'expo-router/ui';

import { TabBar, TabButton } from '@/components/tab-bar';

export default function TabsLayout() {
  return (
    <Tabs>
      <TabSlot style={{ height: '100%' }} />
      <TabList asChild>
        <TabBar>
          <TabTrigger name="home" href="/" asChild>
            <TabButton icon="home">Home</TabButton>
          </TabTrigger>
          <TabTrigger name="analytics" href="/analytics" asChild>
            <TabButton icon="chart">Analytics</TabButton>
          </TabTrigger>
          <TabTrigger name="settings" href="/settings" asChild>
            <TabButton icon="settings">Settings</TabButton>
          </TabTrigger>
        </TabBar>
      </TabList>
    </Tabs>
  );
}
