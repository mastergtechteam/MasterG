# Navigation Architecture Guide

## Overview

The app uses a **hybrid navigation pattern** combining Drawer, Tab, and Stack navigators for a scalable and maintainable structure.

## Navigation Hierarchy

```
RootNavigator
├── Splash Screen
├── Language Selection
├── Auth Navigator (Login/Register)
├── Get Location Screen
└── App Navigator (Main App)
    └── Drawer Navigator (Base Layer)
        ├── Tab Navigator (5 Tabs)
        │   ├── Home (with StackNavigator)
        │   ├── Insights
        │   ├── Voice (Mic Button)
        │   ├── Orders
        │   └── Cart
        ├── Settings Screen
        ├── Terms & Conditions
        ├── Privacy Policy
        └── Return Policy
    └── Global Stack Screens (Overlay)
        ├── Profile Screen
        ├── Edit Profile
        ├── Product List
        ├── Product Details
        ├── Categories
        ├── Deals
        ├── Deal Products
        ├── Cart
        ├── Search
        ├── Register
        └── View Order
```

## Key Components

### 1. **RootNavigator** (`src/navigation/RootNavigator.jsx`)

- Entry point of the app
- Handles app initialization flow
- Manages authentication state

### 2. **AppNavigator** (`src/navigation/AppNavigator.jsx`)

- **Foundation**: Routes to Drawer Navigator
- **Global Screens**: Stack screens overlaid on the Drawer
- All product, profile, and detail screens are global screens

### 3. **DrawerNavigator** (`src/navigation/DrawerNavigator.jsx`)

- **Base layer** - created once and persists
- Contains:
  - Tab Navigator (main navigation)
  - Settings Screen
  - Legal screens (Terms, Privacy, Refund Policy)
- Custom drawer content with user info
- Logout and delete account functions

### 4. **TabNavigator** (`src/navigation/TabNavigator.jsx`)

- 5 main tabs for user interaction
- Home tab contains its own Stack Navigator
- Mic button in center (custom)

### 5. **StackNavigator** (`src/navigation/StackNavigator.jsx`)

- Used inside Home tab
- Manages home-specific navigation

## User Navigation Flow (Bug Fix Explanation)

### Original Issue

```
Home Screen → Orders Tab → Profile Icon → Settings Button → CRASH ❌
```

**Root cause**: `navigation.openDrawer()` doesn't exist when Profile is a global stack screen.

### Fixed Flow

```
Home Screen → Orders Tab → Profile Icon → Settings Button → Settings Screen ✅
```

**Solution**: Profile screen now navigates to Settings through drawer:

```jsx
navigation.navigate('Drawer', { screen: 'Settings' });
```

## Adding New Screens

### For Brand New Features

#### Option 1: Tab Screen (If it's a main feature)

1. Create screen in `src/screens/YourFeature/YourScreen.jsx`
2. Add to TabNavigator:

```jsx
<Tab.Screen
  name="YourFeature"
  component={YourScreen}
  options={{
    tabBarIcon: ({ color, size }) => (
      <Ionicons name="icon-name" size={size} color={color} />
    ),
  }}
/>
```

#### Option 2: Drawer Screen (For settings/info)

1. Create screen in `src/screens/YourFeature/YourScreen.jsx`
2. Add to DrawerNavigator:

```jsx
<Drawer.Screen name="Your Feature" component={YourScreen} />
```

3. Add to CustomDrawerContent:

```jsx
<DrawerItem
  icon={({ size }) => <Icon name="icon" size={size} color="#fff" />}
  label="Your Feature"
  labelStyle={styles.labelStyle}
  onPress={() => {
    navigation.navigate('Your Feature');
    navigation.closeDrawer();
  }}
/>
```

#### Option 3: Global Stack Screen (For details/overlays)

1. Create screen in `src/screens/YourFeature/YourScreen.jsx`
2. Add to AppNavigator:

```jsx
<Stack.Screen name="YourFeature" component={YourScreen} />
```

3. Navigate from anywhere using:

```jsx
navigation.navigate('YourFeature');
```

## Navigation Best Practices

### ✅ DO

- Use global stack screens for detail pages (product details, order details)
- Use drawer screens for settings and info pages
- Use tab screens for main features with dedicated top-level access
- Always close drawer after navigation:
  ```jsx
  navigation.navigate('Settings');
  navigation.closeDrawer();
  ```
- Pass navigation state via route params for complex flows

### ❌ DON'T

- Try to access drawer from nested tab stack (use route.navigate instead)
- Create new navigators without documenting here
- Use `navigation.navigate()` for the same screen (can cause loops)
- Forget to close drawer when navigating

## Navigation Prop Reference

```jsx
const navigation = useNavigation();

// Navigate to drawer screen
navigation.navigate('Drawer', { screen: 'Settings' });

// Navigate to global stack screen
navigation.navigate('Profile');

// Navigate with params
navigation.navigate('Product-Details', { productId: 123 });

// Go back
navigation.goBack();

// Replace (clear history)
navigation.replace('Auth');

// Reset entire navigation tree
navigation.reset({
  index: 0,
  routes: [{ name: 'Drawer' }],
});
```

## Screen-to-Screen Navigation Map

| From         | To              | Method          | Example                                    |
| ------------ | --------------- | --------------- | ------------------------------------------ |
| Home Tab     | Profile         | Global Stack    | `navigate('Profile')`                      |
| Profile      | Settings        | Drawer          | `navigate('Drawer', {screen: 'Settings'})` |
| Product List | Product Details | Global Stack    | `navigate('Product-Details', {id})`        |
| Any Tab      | Drawer Menu     | Built-in Drawer | `openDrawer()` _(from within drawer)_      |
| Anywhere     | Search          | Global Stack    | `navigate('Search')`                       |
| Checkout     | Order Success   | Global Stack    | `navigate('ViewOrder', {orderId})`         |

## Common Issues & Solutions

### Issue: "Screen 'X' not found in navigation"

**Solution**: Check if screen is registered in the correct navigator

### Issue: Drawer not opening from tab screens

**Solution**: Drawer is managed by DrawerNavigator, not accessible from within tabs. Use a header button instead if needed.

### Issue: Going back from detail screen goes to wrong screen

**Solution**: Use `navigation.reset()` instead of `goBack()` when you want to clear history

### Issue: Memory leak from unmounted screens

**Solution**: Clean up listeners in useEffect cleanup:

```jsx
useEffect(() => {
  const unsubscribe = navigation.addListener('beforeRemove', () => {
    // Cleanup
  });
  return unsubscribe;
}, [navigation]);
```

## File Structure

```
src/
├── navigation/
│   ├── RootNavigator.jsx      ← App entry point
│   ├── AppNavigator.jsx        ← Main app structure
│   ├── DrawerNavigator.jsx     ← Drawer with settings
│   ├── TabNavigator.jsx        ← Bottom tab navigation
│   ├── StackNavigator.jsx      ← Home tab stack
│   ├── AuthNavigator.jsx       ← Authentication flow
│   └── README.md               ← Navigation mapping
├── screens/
│   ├── Home/
│   ├── Profile/
│   ├── Settings/
│   ├── Product/
│   ├── Order/
│   ├── Legal/
│   └── ...
└── ...
```

## Future Enhancements

1. **Deep Linking**: Add URL routing for direct screen access
2. **State Persistence**: Save navigation state for app resume
3. **Analytics**: Track navigation events for user behavior
4. **Auth Guards**: Prevent unauthorized screen access
5. **Animations**: Custom screen transition animations

## Testing Navigation

```jsx
// Test navigation from Profile to Settings
test('Profile screen should navigate to Settings', () => {
  const navigation = { navigate: jest.fn() };
  // ... test implementation
  expect(navigation.navigate).toHaveBeenCalledWith('Drawer', {
    screen: 'Settings',
  });
});
```

---

**Last Updated**: March 2026
**Maintainer**: Development Team
