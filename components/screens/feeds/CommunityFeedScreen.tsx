import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HStack, Input, Text, useTheme, VStack } from "native-base";
import React, { useEffect, useMemo, useState } from "react";
import FastImage from "react-native-fast-image";
import {
  IconEye,
  IconHeart,
  IconInfoCircle,
  IconPlanet,
  IconPlus,
  IconUserHeart,
} from "tabler-icons-react-native";
import { getBaseUrl } from "../../../helpers/LinkHelper";
import useCommunityFeed from "../../hooks/feeds/useCommunityFeed";
import CustomButton from "../../ui/buttons/CustomButton";
import FeedView from "../../ui/Feed/FeedView";
import LoadingErrorView from "../../ui/Loading/LoadingErrorView";
import NotFoundView from "../../ui/Loading/NotFoundView";
import useDebounce from "../../hooks/utility/useDebounce";
import { TextInput } from "react-native-gesture-handler";
import SearchBar from "../../ui/search/SearchBar";

function FeedsCommunityScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: NativeStackNavigationProp<any>;
}) {
  const { communityFullName, communityName, actorId } = route.params;

  const communityFeed = useCommunityFeed(communityFullName);
  const theme = useTheme();

  const headerTitle = () => (
    <VStack alignItems="center">
      <Text fontSize={16} fontWeight="semibold">
        {communityName.toString()}
      </Text>
      <Text fontSize={12}>@{getBaseUrl(actorId.toString())}</Text>
    </VStack>
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle,
      title: communityName,
    });

    communityFeed.feed.doLoad();
  }, []);

  const [term, setTerm] = useState("");

  // useEffect(() => {
  //   console.log(term);
  // }, [term]);

  if (communityFeed.feed.communityNotFound) {
    return <NotFoundView />;
  }

  if (communityFeed.feed.communityError || communityFeed.feed.postsError) {
    return <LoadingErrorView onRetryPress={communityFeed.feed.doLoad} />;
  }

  const header = () => {
    if (communityFeed.feed.communityLoading || !communityFeed.feed.community)
      return null;

    return (
      <VStack pt={3} pb={5} px={5}>
        <SearchBar query={term} setQuery={setTerm} autoFocus={false} />
        <HStack alignItems="center" space={5}>
          {communityFeed.feed.community.community.icon ? (
            <FastImage
              source={{
                uri: communityFeed.feed.community.community.icon,
              }}
              style={{
                height: 96,
                width: 96,
                borderRadius: 100,
              }}
            />
          ) : (
            <IconPlanet color={theme.colors.app.textSecondary} size={64} />
          )}

          <VStack alignContent="center">
            <HStack space={2}>
              <HStack space={1}>
                <IconUserHeart
                  color={theme.colors.app.textSecondary}
                  size={20}
                />
                <Text color={theme.colors.app.textSecondary}>
                  {communityFeed.feed.community.counts.subscribers}
                </Text>
              </HStack>
              <HStack space={1}>
                <IconEye color={theme.colors.app.textSecondary} size={20} />
                <Text color={theme.colors.app.textSecondary}>
                  {communityFeed.feed.community.counts.users_active_month}
                </Text>
              </HStack>
            </HStack>
            <Text fontSize="3xl" fontWeight="bold">
              {communityFeed.feed.community.community.name}
            </Text>
            <Text fontSize="md" color={theme.colors.app.textSecondary} mt={-2}>
              {getBaseUrl(communityFeed.feed.community.community.actor_id)}
            </Text>
          </VStack>
        </HStack>
        <VStack pt={8}>
          <HStack justifyContent="space-between" alignItems="center" space={3}>
            <CustomButton
              onPress={communityFeed.onSubscribePress}
              icon={IconHeart}
              iconFill={
                communityFeed.feed.community.subscribed === "Subscribed" ||
                communityFeed.feed.community.subscribed === "Pending"
              }
              text={
                communityFeed.feed.community.subscribed === "Subscribed" ||
                communityFeed.feed.community.subscribed === "Pending"
                  ? "Subscribed"
                  : "Subscribe"
              }
            />
            <CustomButton
              onPress={communityFeed.onAboutPress}
              icon={IconInfoCircle}
              text="About"
            />
            <CustomButton
              onPress={communityFeed.onPostPress}
              icon={IconPlus}
              text="Post"
            />
          </HStack>
        </VStack>
      </VStack>
    );
  };

  return <FeedView feed={communityFeed.feed} community header={header} />;
}

export default FeedsCommunityScreen;
