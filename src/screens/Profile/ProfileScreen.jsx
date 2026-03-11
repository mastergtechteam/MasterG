import React, { useEffect, useState } from 'react';
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
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

import AppSafeArea from '../../components/common/AppSafeArea';
import AppView from '../../components/common/AppView';
import AppText from '../../components/common/AppText';
import Header from '../../components/common/Header';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../api/apiClient';
import RNRestart from 'react-native-restart';
import GoBackHeader from '../../components/common/GoBackHeader';
import { useDispatch, useSelector } from 'react-redux';
import {
  setRetailerProfile,
  clearRetailerProfile,
} from '../../features/profile/retailerSlice';

import { clearAuthData } from '../../utils/secureStore';
import { Platform, ToastAndroid } from 'react-native';

const ProfileScreen = () => {
  const retailer = useSelector(state => state.retailer.profile);
  const loading = useSelector(state => state.retailer.loading);
  const dispatch = useDispatch();
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
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              // 1️⃣ Clear secure storage
              await clearAuthData();

              // 2️⃣ Clear AsyncStorage (only if you store other app data)
              await AsyncStorage.clear();

              // 3️⃣ Clear Redux
              dispatch(clearRetailerProfile());

              // 4️⃣ Navigate
              navigation.replace('Auth');

              if (Platform.OS === 'android') {
                ToastAndroid.show(
                  'Logged out successfully',
                  ToastAndroid.SHORT,
                );
              }
            } catch (error) {
              console.log('Logout Error:', error);
            }
          },
        },
      ],
      { cancelable: true },
    );
  };

  const handleSettings = () => {
    navigation.navigate('Settings');
  };
  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  const handlePanGst = () => {
    Alert.alert(
      'PAN/GST Not Added',
      'You have not added PAN or GST details yet.',
      [{ text: 'OK' }],
    );
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

  if (loading) {
    return (
      <AppSafeArea style={styles.container}>
        <GoBackHeader title="Profile Details" showSearch={false} />
        <AppView
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <AppText>Loading profile...</AppText>
        </AppView>
      </AppSafeArea>
    );
  }

  const shouldShowCreateProfile =
    !retailer?.storeName || !retailer?.address?.line1;
  const profileComplete =
    !!retailer &&
    retailer.storeName &&
    retailer.address &&
    retailer.address.line1;
  const profileIncomplete = !!retailer && !profileComplete;

  return (
    <AppSafeArea style={styles.container}>
      <GoBackHeader title="Profile Details" showSearch={false} />

      <AppView style={styles.contentWrapper}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* banner area */}
          {shouldShowCreateProfile ? (
            <AppView style={styles.incompleteBox}>
              <MaterialIcons
                name="person-add-alt-1"
                size={26}
                color={colors.warning}
              />

              <AppText style={styles.incompleteTitle}>
                Create Your Profile
              </AppText>

              <AppText style={styles.incompleteSub}>
                Complete your profile to start managing your shop, track orders,
                and unlock all features.
              </AppText>

              <TouchableOpacity
                style={styles.completeBtn}
                onPress={() => navigation.navigate('Register')}
                activeOpacity={0.8}
              >
                <AppText style={styles.completeBtnText}>Create Profile</AppText>
              </TouchableOpacity>
            </AppView>
          ) : profileIncomplete ? (
            <AppView style={styles.incompleteBox}>
              <MaterialIcons
                name="error-outline"
                size={26}
                color={colors.warning}
              />

              <AppText style={styles.incompleteTitle}>
                Your profile is not complete
              </AppText>

              <AppText style={styles.incompleteSub}>
                Please complete your shop details to continue using all
                features.
              </AppText>

              <TouchableOpacity
                style={styles.completeBtn}
                onPress={() => navigation.navigate('Register')}
                activeOpacity={0.8}
              >
                <AppText style={styles.completeBtnText}>
                  Complete Profile
                </AppText>
              </TouchableOpacity>
            </AppView>
          ) : null}

          {/* profile content shows whenever retailer exists and not in create-profile mode */}
          {retailer && !shouldShowCreateProfile && (
            <>
              {/* Profile Header */}
              <AppView style={styles.profileSection}>
                <AppView style={styles.profileImageContainer}>
                  {retailer?.shop_image ? (
                    <Image
                      source={{ uri: retailer.shop_image }}
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
                  <AppText style={styles.ownerName}>
                    {retailer?.ownerName || retailer?.retailerId}
                  </AppText>
                  <AppText style={styles.storeName}>
                    {retailer?.storeName || ''}
                  </AppText>
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

                  <TouchableOpacity
                    style={[styles.editButton, styles.editBtn]}
                    onPress={handleEditProfile}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="add" size={18} color={colors.primary} />
                    <AppText style={styles.editBtnText}>Edit Profile</AppText>
                  </TouchableOpacity>
                </AppView>
              </AppView>

              {/* Shop Details Section */}
              <ExpandableSection
                title="Shop Details"
                section="shop"
                icon={
                  <MaterialIcons
                    name="store"
                    size={20}
                    color={colors.primary}
                  />
                }
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
                    <MaterialIcons
                      name="person"
                      size={16}
                      color={colors.primary}
                    />
                  }
                />
                <View style={styles.divider} />
                <InfoItem
                  label="Shop ID"
                  value={retailer?.retailerId}
                  icon={
                    <MaterialIcons
                      name="badge"
                      size={16}
                      color={colors.primary}
                    />
                  }
                />
              </ExpandableSection>

              {/* Delivery Address Section */}
              <ExpandableSection
                title="Delivery Address"
                section="address"
                icon={
                  <Entypo
                    name="location-pin"
                    size={20}
                    color={colors.primary}
                  />
                }
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
                <InfoItem
                  label="Address Line 2"
                  value={retailer?.address?.line2}
                />
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
                    <MaterialIcons
                      name="email"
                      size={16}
                      color={colors.primary}
                    />
                  }
                />
                <View style={styles.divider} />
                <InfoItem
                  label="Alternate Mobile"
                  value={retailer?.contact?.alternateMobile}
                  icon={
                    <MaterialIcons
                      name="phone"
                      size={16}
                      color={colors.primary}
                    />
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
                {retailer?.documents?.panNumber ||
                retailer?.documents?.gstNumber ||
                retailer?.pancard ||
                retailer?.documents?.panImage ||
                retailer?.documents?.gstImage ? (
                  <>
                    {retailer?.documents?.panNumber && (
                      <>
                        <InfoItem
                          label="PAN Number"
                          value={retailer.documents.panNumber}
                          icon={
                            <MaterialIcons
                              name="badge"
                              size={16}
                              color={colors.primary}
                            />
                          }
                        />
                        <View style={styles.divider} />
                      </>
                    )}

                    {retailer?.documents?.gstNumber && (
                      <>
                        <InfoItem
                          label="GST Number"
                          value={retailer.documents.gstNumber}
                          icon={
                            <MaterialIcons
                              name="receipt"
                              size={16}
                              color={colors.primary}
                            />
                          }
                        />
                        <View style={styles.divider} />
                      </>
                    )}

                    {retailer?.pancard && (
                      <>
                        <AppText style={{ marginBottom: 8 }}>PAN Image</AppText>
                        <Image
                          source={{ uri: retailer.pancard }}
                          style={styles.documentImage}
                        />
                        <View style={styles.divider} />
                      </>
                    )}

                    {retailer?.documents?.gstImage && (
                      <>
                        <AppText style={{ marginBottom: 8 }}>GST Image</AppText>
                        <Image
                          source={{ uri: retailer.documents.gstImage }}
                          style={styles.documentImage}
                        />
                      </>
                    )}
                  </>
                ) : (
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
                )}
              </ExpandableSection>

              {/* Shop Image Section */}
              <ExpandableSection
                title="Shop Image"
                section="shopImage"
                icon={
                  <MaterialIcons
                    name="image"
                    size={20}
                    color={colors.primary}
                  />
                }
              >
                <AppView style={styles.shopImageContainer}>
                  {retailer?.shop_image ? (
                    <Image
                      source={{ uri: retailer.shop_image }}
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

              {/* actions placeholder - buttons rendered below */}
            </>
          )}
        </ScrollView>

        {/* actions always at bottom - outside scrollview */}
        <AppView style={styles.actionsContainer}>
          <TouchableOpacity
            style={[styles.actionButton, styles.settingsBtn]}
            onPress={handleSettings}
            activeOpacity={0.7}
          >
            <MaterialIcons name="settings" size={18} color={colors.primary} />
            <AppText style={styles.settingsBtnText}>Settings</AppText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.logoutBtn]}
            onPress={handleLogout}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons
              name="logout"
              size={18}
              color={colors.error}
            />
            <AppText style={styles.logoutBtnText}>Logout</AppText>
          </TouchableOpacity>
        </AppView>
      </AppView>
    </AppSafeArea>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentWrapper: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    paddingBottom: spacing.lg,
  },
  profileSection: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.lg,
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
    fontSize: 16,
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
    marginBottom: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: 12,
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
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
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
    letterSpacing: 0.3,
  },
  sectionContent: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
    paddingVertical: spacing.xs,
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
    fontSize: 11,
    color: colors.textMuted,
    flex: 1,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textPrimary,
    textAlign: 'right',
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.sm,
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
    flexDirection: 'row',
    backgroundColor: colors.background,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    gap: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginBottom: 80,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    borderRadius: 12,
    gap: spacing.sm,
    flex: 1,
  },
  settingsBtn: {
    backgroundColor: colors.primary + '15',
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  settingsBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
  },
  logoutBtn: {
    backgroundColor: colors.error + '15',
    borderWidth: 1.5,
    borderColor: colors.error,
  },
  logoutBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.error,
  },
  incompleteBox: {
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    marginBottom: spacing.md,
    padding: spacing.lg,
    borderRadius: 14,
    backgroundColor: colors.warning + '15',
    borderWidth: 1,
    borderColor: colors.warning + '40',
    alignItems: 'center',
  },

  incompleteTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: spacing.sm,
  },

  incompleteSub: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    textAlign: 'center',
  },

  completeBtn: {
    marginTop: spacing.md,
    backgroundColor: colors.warning,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 10,
  },

  completeBtnText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 13,
  },
  documentImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 12,
    resizeMode: 'cover',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: spacing.sm,
    flex: 1,
    marginTop: 10,
  },
  editBtn: {
    backgroundColor: colors.primary + '15',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  editBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
  },
});
