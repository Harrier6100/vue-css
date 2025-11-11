<template>
    <div class="container mx-auto">
        <h1 class="mb-3">{{ t('menu.coating_reports') }}</h1>
        <div class="mb-3">
            <form @submit.prevent="onSearch" autocomplete="off">
                <div class="mb-3">
                    <label>{{ t('label.coating_reports.coating_date') }}</label>
                    <Input type="text" id="coatingDateFrom" v-model="form.coatingDateFrom" />
                    <Input type="text" id="coatingDateTo" v-model="form.coatingDateTo" />
                </div>
                <div class="mb-3">
                    <label>{{ t('label.coating_reports.machine_code') }}</label>
                    <Input type="text" id="machineCode" v-model="form.machineCode" />
                </div>
                <div class="mb-3">
                    <label>{{ t('label.coating_reports.product_code') }}</label>
                    <Input type="text" id="productCode" v-model="form.productCode" />
                </div>
                <div class="mb-3">
                    <Button variant="primary" type="submit" :disabled="isLoading">
                        <span v-if="isSpinning"></span>{{ t('button.search') }}
                    </Button>
                    <Button type="button" @click="onReset">{{ t('button.reset') }}</Button>
                </div>
                <span class="text-red-500">{{ errors.error }}</span>
            </form>
        </div>
        <div class="mb-3">
            <table>
                <thead>
                    <tr>
                        <Th sortKey="machineCode" :sortBy :orderBy>{{ t('label.coating_reports.machine_code') }}</Th>
                        <Th sortKey="machineName" :sortBy :orderBy>{{ t('label.coating_reports.machine_name') }}</Th>
                        <Th sortKey="coatingDate" :sortBy :orderBy>{{ t('label.coating_reports.coating_date') }}</Th>
                        <Th sortKey="productCode" :sortBy :orderBy>{{ t('label.coating_reports.product_code') }}</Th>
                        <Th sortKey="productName" :sortBy :orderBy>{{ t('label.coating_reports.product_name') }}</Th>
                        <Th sortKey="coatingSqmQty" :sortBy :orderBy>{{ t('label.coating_reports.coating_sqm_qty') }}</Th>
                        <Th sortKey="bsIssueSqmQty" :sortBy :orderBy>{{ t('label.coating_reports.bs_issue_sqm_qty') }}</Th>
                        <Th sortKey="bsYield" :sortBy :orderBy>{{ t('label.coating_reports.bs_yield') }}</Th>
                        <Th sortKey="spIssueSqmQty" :sortBy :orderBy>{{ t('label.coating_reports.sp_issue_sqm_qty') }}</Th>
                        <Th sortKey="spYield" :sortBy :orderBy>{{ t('label.coating_reports.sp_yield') }}</Th>
                        <Th sortKey="rate" :sortBy :orderBy>{{ t('label.coating_reports.rate') }}</Th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                    <tr v-for="(coatingRecord, index) in sortedData" :key="index">
                        <Td class="px-2 py-2 text-start">{{ coatingRecord.machineCode }}</Td>
                        <Td class="px-2 py-2 text-start">{{ coatingRecord.machineName }}</Td>
                        <Td class="px-2 py-2 text-start">{{ coatingRecord.coatingDate }}</Td>
                        <Td class="px-2 py-2 text-start">{{ coatingRecord.productCode }}</Td>
                        <Td class="px-2 py-2 text-start">{{ coatingRecord.productName }}</Td>
                        <Td class="px-2 py-2 text-end">{{ coatingRecord.coatingSqmQty }}</Td>
                        <Td class="px-2 py-2 text-end">{{ coatingRecord.bsIssueSqmQty }}</Td>
                        <Td class="px-2 py-2 text-end">{{ coatingRecord.bsYield }}</Td>
                        <Td class="px-2 py-2 text-end">{{ coatingRecord.spIssueSqmQty }}</Td>
                        <Td class="px-2 py-2 text-end">{{ coatingRecord.spYield }}</Td>
                        <Td class="px-2 py-2 text-end">{{ coatingRecord.rate }}</Td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import * as yup from 'yup';
import { useLoading } from '@/composables/useLoading';
import { useSpinning } from '@/composables/useSpinning';
import { useDataTable } from '@/composables/useDataTable';
import { errorHandler } from '@/composables/useErrorHandler';
import { useValidate } from '@/composables/useValidate';
import { api } from '@/api/api';

const { t } = useI18n();
const { isLoading, startLoading, stopLoading } = useLoading();
const { isSpinning, execute } = useSpinning();
const { errors, validate } = useValidate();

const coatingReports = ref([]);
const { sortedData, sortBy, orderBy } = useDataTable(coatingReports, 10);

const schema = yup.object().shape({
    coatingDateFrom: yup.string().nullable(),
    coatingDateTo: yup.string().nullable(),
    machineCode: yup.string().nullable(),
    productCode: yup.string().nullable(),
}).test(
    '', t('error.condition.empty'),
    (values) => Object.values(values).some((v) => v != null && v !== '')
);

const formRestore = () => ({
    coatingDateFrom: '',
    coatingDateTo: '',
    machineCode: '',
    productCode: '',
});
const form = ref(formRestore());

const onSearch = async () => {
    if (!await validate(schema, form.value)) return;

    startLoading();
    try {
        await execute(async () => {
            const response = await api.get(`/api/coating/reports`, { params: form.value });
            coatingReports.value = response.data;
        });
    } catch (error) {
        errorHandler(error);
    } finally {
        stopLoading();
    }
};

const onReset = () => {
    form.value = formRestore();
    coatingReports.value = [];
    errors.value = {};
};
</script>