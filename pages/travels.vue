<script lang="ts" setup>
import type { Travel, CreateTravelBody } from "~/schemas";
import type {
  TravelsTableInstance,
  ModalInstance,
} from "~/components/instances";

const travelsTable = ref<TravelsTableInstance | null>(null);
const travelResourceModal = ref<ModalInstance | null>(null);

const selectedTravel = ref<Travel>();

const setSelectedTravel = (travel: Travel) => {
  selectedTravel.value = travel;
};

const clearSelectedTravel = () => {
  selectedTravel.value = undefined;
  travelsTable.value?.clearSelected();
};

const travelApi = useTravelApi();

const onCreateTravel = () => {
  travelResourceModal.value?.show();
};

const onUpdateTravel = (travel: Travel) => {
  setSelectedTravel(travel);
  travelResourceModal.value?.show();
};

const savingTravel = ref(false);
const saveTravel = async (body: CreateTravelBody) => {
  try {
    savingTravel.value = true;

    if (selectedTravel.value) {
      await travelApi.update(selectedTravel.value.id, body);

      clearSelectedTravel();
      return;
    }

    await travelApi.create(body);
    travelResourceModal.value?.hide();
    alert("Travel created succesfully");
  } catch (error) {
    alert(`Cannot save travel`);
  } finally {
    savingTravel.value = false;
    travelsTable.value?.refresh();
  }
};

const deleteTravel = async (travel: Travel) => {
  try {
    await travelApi.delete(travel.id);

    travelsTable.value?.clearSelected();
    alert(`Travel ${travel.name} deleted`);
  } catch (error) {
    alert(`Error: cannot delete "${travel.name}" travel`);
  } finally {
    travelsTable.value?.refresh();
  }
};

const onDeleteTravel = async (travel: Travel) => {
  const shouldDelete = confirm(`Do you want to delete ${travel.name} ?`);

  if (shouldDelete) deleteTravel;
};
</script>

<template>
  <div>
    <div class="container">
      <TravelsTable
        ref="travelsTable"
        @create="onCreateTravel"
        @update="([travel]) => onUpdateTravel(travel)"
        @delete="([travel]) => onDeleteTravel(travel)"
      />
    </div>

    <UiModal ref="travelResourceModal" class="max-w-2xl" title="Add new travel">
      <TravelResourceForm
        :travel="selectedTravel"
        :saving="savingTravel"
        @save="saveTravel"
      />
    </UiModal>
  </div>
</template>
