<template>
  <UContainer>
    <NuxtPage />
  </UContainer>

  <UNotifications>
    <template #description="{ description }">
      <span v-html="description" />
    </template>
  </UNotifications>
</template>
