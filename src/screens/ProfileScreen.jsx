import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import AppSafeArea from '../components/common/AppSafeArea';
import AppView from '../components/common/AppView';
import AppText from '../components/common/AppText';
import Header from '../components/common/Header';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

const STATIC_RETAILER = {
  retailerId: 'RET1003',
  storeName: 'Akash Super Mart',
  ownerName: 'Akash',
  status: 'INACTIVE',
  contact: '9876543211',
  address: 'MG Road, Indore, Madhya Pradesh',
  createdAt: '2026-02-04T08:25:19.023Z',
  updatedAt: '2026-02-04T08:25:19.023Z',
  businessDetails: {
    businessType: 'Grocery Store',
    gstNumber: '22AAAAA0000A1Z5',
    licenseNumber: 'LIC123456',
  },
  inventorySummary: {
    totalProducts: 250,
    categories: ['Groceries', 'Beverages', 'Snacks'],
  },
  services: ['Home Delivery', 'Card Payment', 'UPI Accepted'],
};

const ProfileScreen = () => {
  // const [loading, setLoading] = useState(true);
  // const [retailer, setRetailer] = useState(null);
  const [loading] = useState(false); // static for now
  const [retailer] = useState(STATIC_RETAILER);

  // const retailerId = 'RET1003'; // hardcoded for now

  // useEffect(() => {
  //   fetchRetailer();
  // }, []);

  // const fetchRetailer = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await fetch(
  //       `https://bo2o9git21.execute-api.ap-south-1.amazonaws.com/retailers/${retailerId}`,
  //     );
  //     const json = await response.json();
  //     if (response.ok && json?.success) {
  //       setRetailer(json.data);
  //     } else {
  //       console.log('API ERROR 👉', json);
  //     }
  //   } catch (err) {
  //     console.log('FETCH RETAILER ERROR 👉', err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleUpdateProfile = () => {
    console.log('📝 UPDATE PROFILE clicked 👉', retailer);
  };

  const handleDeleteProfile = () => {
    console.log('🗑️ DELETE PROFILE clicked 👉', retailer?.retailerId);
  };

  const handleLogout = () => {
    console.log('🚪 LOGOUT clicked');
  };

  const StatCard = ({ icon, label, value }) => (
    <AppView style={styles.statCard}>
      <View style={styles.statIconBox}>{icon}</View>
      <AppView>
        <AppText style={styles.statLabel}>{label}</AppText>
        <AppText style={styles.statValue}>{value}</AppText>
      </AppView>
    </AppView>
  );

  const InfoRow = ({ icon, label, value }) => (
    <AppView style={styles.infoRow}>
      <View style={styles.infoIconBox}>{icon}</View>
      <AppView style={styles.infoContent}>
        <AppText style={styles.infoLabel}>{label}</AppText>
        <AppText style={styles.infoValue}>{value || '—'}</AppText>
      </AppView>
    </AppView>
  );

  // if (loading) {
  //   return (
  //     <AppSafeArea style={styles.container}>
  //       <Header />
  //       <ActivityIndicator
  //         size="large"
  //         color={colors.primary}
  //         style={{ marginTop: 40 }}
  //       />
  //     </AppSafeArea>
  //   );
  // }

  const statusColor =
    retailer?.status === 'ACTIVE' ? colors.success : colors.warning;

  return (
    <AppSafeArea style={styles.container}>
      <Header />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: spacing.lg,
          paddingHorizontal: spacing.md,
          paddingVertical: spacing.md,
          paddingBottom: 100,
        }}
      >
        {/* Store Header Card */}
        <AppView style={styles.headerCard}>
          <AppView style={styles.storeIconBox}>
            <Ionicons name="storefront" size={32} color={colors.primary} />
          </AppView>
          <AppView style={{ flex: 1, backgroundColor: colors.surface }}>
            <AppText style={styles.storeName}>{retailer?.storeName}</AppText>
            <AppText style={styles.ownerName}>{retailer?.ownerName}</AppText>
            <View style={styles.statusBadge}>
              <View
                style={[styles.statusDot, { backgroundColor: statusColor }]}
              />
              <AppText style={[styles.statusText, { color: statusColor }]}>
                {retailer?.status}
              </AppText>
            </View>
          </AppView>
        </AppView>

        {/* Quick Stats */}
        <AppView style={styles.statsContainer}>
          <StatCard
            icon={
              <MaterialIcons
                name="inventory-2"
                size={24}
                color={colors.primary}
              />
            }
            label="Products"
            value={retailer?.inventorySummary?.totalProducts || 0}
          />
          <StatCard
            icon={
              <Ionicons name="pricetags" size={24} color={colors.primary} />
            }
            label="Categories"
            value={retailer?.inventorySummary?.categories?.length || 0}
          />
        </AppView>

        {/* Business Details Section */}
        <AppView style={styles.section}>
          <AppText style={styles.sectionTitle}>Business Details</AppText>
          <AppView style={styles.sectionContent}>
            <InfoRow
              icon={
                <MaterialIcons
                  name="business"
                  size={20}
                  color={colors.primary}
                />
              }
              label="Business Type"
              value={retailer?.businessDetails?.businessType}
            />
            <View style={styles.divider} />
            <InfoRow
              icon={
                <MaterialIcons
                  name="receipt"
                  size={20}
                  color={colors.primary}
                />
              }
              label="GST Number"
              value={retailer?.businessDetails?.gstNumber}
            />
            <View style={styles.divider} />
            <InfoRow
              icon={
                <Ionicons
                  name="document-text"
                  size={20}
                  color={colors.primary}
                />
              }
              label="License Number"
              value={retailer?.businessDetails?.licenseNumber}
            />
          </AppView>
        </AppView>

        {/* Contact & Location Section */}
        <AppView style={styles.section}>
          <AppText style={styles.sectionTitle}>Contact & Location</AppText>
          <AppView style={styles.sectionContent}>
            <InfoRow
              icon={<Ionicons name="call" size={20} color={colors.primary} />}
              label="Contact"
              value={`+91 ${retailer?.contact}`}
            />
            <View style={styles.divider} />
            <InfoRow
              icon={
                <Entypo name="location-pin" size={20} color={colors.primary} />
              }
              label="Address"
              value={retailer?.address}
            />
          </AppView>
        </AppView>

        {/* Services Section */}
        {retailer?.services && retailer.services.length > 0 && (
          <AppView style={styles.section}>
            <AppText style={styles.sectionTitle}>Services Offered</AppText>
            <AppView style={styles.servicesContainer}>
              {retailer.services.map((service, idx) => (
                <View key={idx} style={styles.serviceBadge}>
                  <AppText style={styles.serviceBadgeText}>{service}</AppText>
                </View>
              ))}
            </AppView>
          </AppView>
        )}

        {/* Categories Section */}
        {retailer?.inventorySummary?.categories &&
          retailer.inventorySummary.categories.length > 0 && (
            <AppView style={styles.section}>
              <AppText style={styles.sectionTitle}>Product Categories</AppText>
              <AppView style={styles.categoriesContainer}>
                {retailer.inventorySummary.categories.map((category, idx) => (
                  <View key={idx} style={styles.categoryBadge}>
                    <AppText style={styles.categoryBadgeText}>
                      {category}
                    </AppText>
                  </View>
                ))}
              </AppView>
            </AppView>
          )}

        {/* Action Buttons */}
        <AppView style={styles.buttonsContainer}>
          {/* <TouchableOpacity
            style={[styles.actionButton, styles.updateBtn]}
            onPress={handleUpdateProfile}
          >
            <Ionicons
              name="create-outline"
              size={20}
              color={colors.textPrimary}
            />
            <AppText style={styles.updateBtnText}>Update Profile</AppText>
          </TouchableOpacity> */}

          <TouchableOpacity
            style={[styles.actionButton, styles.deleteBtn]}
            onPress={handleDeleteProfile}
          >
            <Ionicons name="trash-outline" size={20} color={colors.error} />
            <AppText style={styles.deleteBtnText}>Delete Profile</AppText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.logoutBtn]}
            onPress={handleLogout}
          >
            <Ionicons name="log-out-outline" size={20} color={colors.error} />
            <AppText style={styles.logoutBtnText}>Logout</AppText>
          </TouchableOpacity>
        </AppView>
      </ScrollView>
    </AppSafeArea>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerCard: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.lg,
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  storeIconBox: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  storeName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
    backgroundColor: colors.surface,
  },
  ownerName: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
    backgroundColor: colors.surface,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: spacing.xs,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: spacing.xs,
    backgroundColor: colors.surface,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    backgroundColor: colors.surface,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  statCard: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    alignItems: 'center',
  },
  statIconBox: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 2,
    backgroundColor: colors.surface,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    backgroundColor: colors.surface,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.md,
    textTransform: 'uppercase',
    opacity: 0.8,
  },
  sectionContent: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    overflow: 'hidden',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: spacing.md,
  },
  infoIconBox: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginHorizontal: spacing.md,
  },
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
  },
  serviceBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 8,
  },
  serviceBadgeText: {
    color: colors.background,
    fontSize: 12,
    fontWeight: '600',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
  },
  categoryBadge: {
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 8,
  },
  categoryBadgeText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '600',
  },
  buttonsContainer: {
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    borderRadius: 12,
    gap: spacing.md,
  },
  updateBtn: {
    backgroundColor: colors.primary,
  },
  updateBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.background,
  },
  deleteBtn: {
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.error,
  },
  deleteBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.error,
  },
  logoutBtn: {
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.error,
  },
  logoutBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.error,
  },
});
