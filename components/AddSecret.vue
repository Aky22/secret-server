<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";
import {z} from "zod";

const toast = useToast();
const isOpen = ref(false);
const schema = z.object({
  secret: z.string().nonempty('Secret is required'),
  expireAfterViews: z.number().int().min(1, 'Must be at least 1'),
  expireAfter: z.number().int().min(0, 'Must be at least 0'),
});

type Schema = z.output<typeof schema>;

const state = reactive({
  secret: undefined,
  expireAfterViews: undefined,
  expireAfter: undefined
});


async function onSubmit(event: FormSubmitEvent<Schema>) {
  const {secret, expireAfterViews, expireAfter} = event.data
  isOpen.value = false;
  const response = await $fetch('/api/secret', {
    method: 'POST',
    body: JSON.stringify({
      secret,
      expireAfterViews,
      expireAfter
    })
  });
  state.secret = ''
  state.expireAfterViews = ''
  state.expireAfter = ''
  toast.add({
    title: 'Secret added',
    description: `
      <p>Hash: ${response.hash}</p>
      <p>Secret: ${response.secretText}</p>
      <p>Created At: ${new Date(response.createdAt).toLocaleString()}</p>
      <p>Expires at: ${response.expiresAt === 'never' ? 'never' : new Date(response.expiresAt).toLocaleString()}</p>
      <p>Remaining views: ${response.remainingViews}</p>
    `,
    timeout: 0
  })

}
</script>

<template>
  <UButton label="Add secret" class="mt-3" @click="isOpen = true" />
  <USlideover v-model="isOpen">
    <div class="p-4 flex-1">
      <UButton
          color="gray"
          variant="ghost"
          size="sm"
          icon="i-heroicons-x-mark-20-solid"
          class="flex sm:hidden absolute end-5 top-5 z-10"
          square
          padded
          @click="isOpen = false"
      />
      <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="Secret" name="secret">
          <UInput v-model="state.secret" />
        </UFormGroup>

        <UFormGroup label="Expire after views" name="expireAfterViews">
          <UInput v-model="state.expireAfterViews" type="number" min="1" />
        </UFormGroup>

        <UFormGroup label="Expire after" name="expireAfter">
          <UInput v-model="state.expireAfter" type="number" min="0" />
        </UFormGroup>

        <UButton type="submit">
          Submit
        </UButton>
      </UForm>
    </div>
  </USlideover>
</template>

<style scoped>

</style>