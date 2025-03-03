<script setup lang="ts">
import AddSecret from "~/components/AddSecret.vue";
const hash = ref(null);
const secret = ref(null);
const error = ref(null);

async function getSecret() {
  try {
    error.value = null;
    secret.value = await $fetch(`/api/secret/${hash.value}`)
    secret.value.createdAt = new Date(secret.value.createdAt).toLocaleString()
    secret.value.expiresAt = secret.value.expiresAt !== 'never' ? new Date(secret.value.expiresAt).toLocaleString() : 'never';
  } catch (e) {
    secret.value = null;
    error.value = e.response.statusText;
  }
}

</script>

<template>
  <UContainer>
    <AddSecret />
    <UFormGroup label="Hash" name="hash" class="mt-3 mb-3">
      <UInput v-model="hash" />
    </UFormGroup>
    <UButton label="Get secret" class="mb-3" @click="getSecret" />
    <UCard v-if="secret !== null">
        <p>Hash: {{secret.hash}}</p>
        <p>Secret: {{secret.secretText}}</p>
        <p>Created At: {{secret.createdAt}}</p>
        <p>Expires at: {{secret.expiresAt}}</p>
        <p>Remaining views: {{secret.remainingViews}}</p>
    </UCard>
    <UAlert
v-if="error !== null"
        icon="i-material-symbols:error"
        color="red"
        variant="solid"
        title="Error"
        :description="error"
    />
  </UContainer>
</template>

<style scoped>

</style>