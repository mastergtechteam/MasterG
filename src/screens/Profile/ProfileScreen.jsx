import React, { useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';

import AppSafeArea from '../../components/common/AppSafeArea';
import AppView from '../../components/common/AppView';
import AppText from '../../components/common/AppText';
import Header from '../../components/common/Header';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { useNavigation } from '@react-navigation/native';

const STATIC_RETAILER = {
  retailerId: 'RET00001',
  storeName: 'Gupta Kirana Store',
  ownerName: 'Ramesh Gupta',
  status: 'ACTIVE',
  contact: {
    mobile: '9876543210',
    alternateMobile: '9123456789',
    email: 'guptakirana@gmail.com',
  },
  address: {
    area: 'Sector 15',
    pincode: '122001',
    city: 'Gurgaon',
    latitude: 28.4595,
    state: 'Haryana',
    line2: 'Near Hanuman Mandir',
    line1: 'Shop No 12, Main Market',
    longitude: 77.0266,
  },
  businessDetails: null,
  storeImage:
    'https://scontent.fdel8-2.fna.fbcdn.net/v/t39.30808-1/301453817_437656268404037_6892418779192837266_n.png?stp=c72.0.455.455a_dst-png_s454x455&_nc_cat=109&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=MS_BE_3GqHoQ7kNvwEKL8Mu&_nc_oc=Adk_Sz7zfCUFXH2Dk5sQukQtVrTTOdSgsWnH_tvdA8bozyBuatClwJmDMKhxjDFtllo&_nc_zt=24&_nc_ht=scontent.fdel8-2.fna&_nc_gid=5QZ0q1lLrq_7qI3rQZ2Azg&oh=00_Afvyhh3UCT09-_HHqZkYXj2LT2Hl8QRvIDS94t37mn7HPw&oe=698E2129',
  createdAt: '2026-02-08T09:26:01.694Z',
  updatedAt: '2026-02-08T09:26:01.694Z',
};

const ProfileScreen = () => {
  const [retailer] = useState(STATIC_RETAILER);
  const [expandedSections, setExpandedSections] = useState({
    shop: false,
    address: false,
    documents: false,
    shopImage: false,
  });
  const navigation = useNavigation();

  const toggleSection = section => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleLogout = () => {
    console.log('🚪 LOGOUT clicked');
  };

  // const handleSettings = () => {
  //   console.log('⚙️ SETTINGS clicked');
  // };
  const handleSettings = () => {
    console.log('⚙️ SETTINGS clicked');
    navigation.openDrawer();
  };

  const handlePanGst = () => {
    Alert.alert(
      'PAN/GST Not Added',
      'You have not added PAN or GST details yet.',
      [{ text: 'OK' }],
    );
  };

  const getFullAddress = () => {
    const addr = retailer?.address;
    if (!addr) return '';
    return `${addr.line1}, ${addr.line2}, ${addr.area}, ${addr.city}, ${addr.state} ${addr.pincode}`;
  };

  const ExpandableSection = ({ title, icon, section, children }) => {
    const isExpanded = expandedSections[section];

    return (
      <AppView style={styles.sectionContainer}>
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => toggleSection(section)}
          activeOpacity={0.7}
        >
          <AppView style={styles.sectionHeaderLeft}>
            <View style={styles.sectionIconBox}>{icon}</View>
            <AppText style={styles.sectionTitle}>{title}</AppText>
          </AppView>
          <MaterialIcons
            name={isExpanded ? 'expand-less' : 'expand-more'}
            size={24}
            color={colors.primary}
          />
        </TouchableOpacity>

        {isExpanded && (
          <AppView style={styles.sectionContent}>{children}</AppView>
        )}
      </AppView>
    );
  };

  const InfoItem = ({ label, value, icon }) => (
    <AppView style={styles.infoItem}>
      <AppView style={styles.infoItemLeft}>
        {icon && <View style={styles.infoIconBox}>{icon}</View>}
        <AppText style={styles.infoLabel}>{label}</AppText>
      </AppView>
      <AppText style={styles.infoValue}>{value}</AppText>
    </AppView>
  );

  return (
    <AppSafeArea style={styles.container}>
      <Header />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Header */}
        <AppView style={styles.profileSection}>
          <AppView style={styles.profileImageContainer}>
            {retailer?.storeImage ? (
              <Image
                source={{ uri: retailer.storeImage }}
                style={styles.profileImage}
              />
            ) : (
              <View style={styles.profileImagePlaceholder}>
                <MaterialCommunityIcons
                  name="store"
                  size={48}
                  color={colors.primary}
                />
              </View>
            )}
          </AppView>

          <AppView style={styles.profileInfo}>
            <AppText style={styles.ownerName}>{retailer?.ownerName}</AppText>
            <AppText style={styles.storeName}>{retailer?.storeName}</AppText>
            <AppView style={styles.mobileSection}>
              <MaterialIcons
                name="phone"
                size={14}
                color={colors.textSecondary}
              />
              <AppText style={styles.mobileNumber}>
                {retailer?.contact?.mobile}
              </AppText>
            </AppView>
            {retailer?.status && (
              <AppView
                style={[
                  styles.statusBadge,
                  {
                    backgroundColor:
                      retailer.status === 'ACTIVE'
                        ? colors.success + '20'
                        : colors.warning + '20',
                  },
                ]}
              >
                <View
                  style={[
                    styles.statusDot,
                    {
                      backgroundColor:
                        retailer.status === 'ACTIVE'
                          ? colors.success
                          : colors.warning,
                    },
                  ]}
                />
                <AppText
                  style={[
                    styles.statusText,
                    {
                      color:
                        retailer.status === 'ACTIVE'
                          ? colors.success
                          : colors.warning,
                    },
                  ]}
                >
                  {retailer.status}
                </AppText>
              </AppView>
            )}
          </AppView>
        </AppView>

        {/* Shop Details Section */}
        <ExpandableSection
          title="Shop Details"
          section="shop"
          icon={<MaterialIcons name="store" size={20} color={colors.primary} />}
        >
          <InfoItem
            label="Shop Name"
            value={retailer?.storeName}
            icon={
              <MaterialIcons
                name="storefront"
                size={16}
                color={colors.primary}
              />
            }
          />
          <View style={styles.divider} />
          <InfoItem
            label="Owner Name"
            value={retailer?.ownerName}
            icon={
              <MaterialIcons name="person" size={16} color={colors.primary} />
            }
          />
          <View style={styles.divider} />
          <InfoItem
            label="Shop ID"
            value={retailer?.retailerId}
            icon={
              <MaterialIcons name="badge" size={16} color={colors.primary} />
            }
          />
        </ExpandableSection>

        {/* Delivery Address Section */}
        <ExpandableSection
          title="Delivery Address"
          section="address"
          icon={<Entypo name="location-pin" size={20} color={colors.primary} />}
        >
          <InfoItem
            label="Address Line 1"
            value={retailer?.address?.line1}
            icon={
              <MaterialIcons
                name="location-on"
                size={16}
                color={colors.primary}
              />
            }
          />
          <View style={styles.divider} />
          <InfoItem label="Address Line 2" value={retailer?.address?.line2} />
          <View style={styles.divider} />
          <InfoItem label="Area" value={retailer?.address?.area} />
          <View style={styles.divider} />
          <InfoItem label="City" value={retailer?.address?.city} />
          <View style={styles.divider} />
          <InfoItem label="State" value={retailer?.address?.state} />
          <View style={styles.divider} />
          <InfoItem label="Pincode" value={retailer?.address?.pincode} />
          <View style={styles.divider} />
          <InfoItem
            label="Email"
            value={retailer?.contact?.email}
            icon={
              <MaterialIcons name="email" size={16} color={colors.primary} />
            }
          />
          <View style={styles.divider} />
          <InfoItem
            label="Alternate Mobile"
            value={retailer?.contact?.alternateMobile}
            icon={
              <MaterialIcons name="phone" size={16} color={colors.primary} />
            }
          />
        </ExpandableSection>

        {/* PAN/GST Section */}
        <ExpandableSection
          title="PAN / GST"
          section="documents"
          icon={
            <MaterialIcons
              name="description"
              size={20}
              color={colors.primary}
            />
          }
        >
          <TouchableOpacity
            style={styles.emptyDocumentBox}
            onPress={handlePanGst}
            activeOpacity={0.7}
          >
            <MaterialIcons
              name="info-outline"
              size={32}
              color={colors.warning}
            />
            <AppText style={styles.emptyDocumentText}>
              PAN/GST details not added yet
            </AppText>
            <AppText style={styles.emptyDocumentSubText}>
              Tap to add your documents
            </AppText>
          </TouchableOpacity>
        </ExpandableSection>

        {/* Shop Image Section */}
        <ExpandableSection
          title="Shop Image"
          section="shopImage"
          icon={<MaterialIcons name="image" size={20} color={colors.primary} />}
        >
          <AppView style={styles.shopImageContainer}>
            {retailer?.storeImage ? (
              <Image
                source={{ uri: retailer.storeImage }}
                style={styles.shopImageDisplay}
              />
            ) : (
              <View style={styles.shopImagePlaceholder}>
                <MaterialCommunityIcons
                  name="image-off"
                  size={48}
                  color={colors.textMuted}
                />
                <AppText style={styles.shopImagePlaceholderText}>
                  No shop image available
                </AppText>
              </View>
            )}
          </AppView>
        </ExpandableSection>

        {/* Action Buttons */}
        <AppView style={styles.actionsContainer}>
          <TouchableOpacity
            style={[styles.actionButton, styles.settingsBtn]}
            onPress={handleSettings}
            activeOpacity={0.7}
          >
            <MaterialIcons name="settings" size={20} color={colors.primary} />
            <AppText style={styles.settingsBtnText}>Settings</AppText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.logoutBtn]}
            onPress={handleLogout}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons
              name="logout"
              size={20}
              color={colors.error}
            />
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
    paddingBottom: 80,
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    paddingBottom: spacing.xl,
  },
  profileSection: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    alignItems: 'center',
  },
  profileImageContainer: {
    marginRight: spacing.lg,
    backgroundColor: colors.surface,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  ownerName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  storeName: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  mobileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    backgroundColor: colors.surface,
  },
  mobileNumber: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: spacing.xs,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: spacing.xs,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  sectionContainer: {
    marginBottom: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: 12,
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    backgroundColor: colors.surface,
  },
  sectionIconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  sectionContent: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  infoItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  infoIconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  infoLabel: {
    fontSize: 12,
    color: colors.textMuted,
    flex: 1,
  },
  infoValue: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
    textAlign: 'right',
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  emptyDocumentBox: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
    backgroundColor: colors.surfaceElevated + '40',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.warning + '30',
  },
  emptyDocumentText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
    marginTop: spacing.sm,
  },
  emptyDocumentSubText: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  shopImageContainer: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  shopImageDisplay: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    backgroundColor: colors.surfaceElevated,
  },
  shopImagePlaceholder: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    backgroundColor: colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shopImagePlaceholderText: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: spacing.sm,
  },
  actionsContainer: {
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    borderRadius: 12,
    gap: spacing.md,
  },
  settingsBtn: {
    backgroundColor: colors.primary + '15',
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  settingsBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },
  logoutBtn: {
    backgroundColor: colors.error + '15',
    borderWidth: 1.5,
    borderColor: colors.error,
  },
  logoutBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.error,
  },
});
