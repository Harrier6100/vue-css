<template>
    <div class="container mx-auto">
        <h1 class="mb-3">{{ t('menu.coating_reports') }}</h1>
        <div class="mb-3">
            <form @submit.prevent="onSearch" autocomplete="off">
                <div class="mb-3">
                    <label>{{ t('label.coating_reports.coating_date') }}</label>
                    <input class="border" type="text" id="coatingDateFrom" v-model="form.coatingDateFrom">
                    <input class="border" type="text" id="coatingDateTo" v-model="form.coatingDateTo">
                </div>
                <div class="mb-3">
                    <label>{{ t('label.coating_reports.machine_code') }}</label>
                    <input class="border" type="text" id="machineCode" v-model="form.machineCode">
                </div>
                <div class="mb-3">
                    <label>{{ t('label.coating_reports.product_code') }}</label>
                    <input class="border" type="text" id="productCode" v-model="form.productCode">
                </div>
                <button class="border bg-blue-500 text-white cursor-pointer disabled:opacity-50 disabled:pointer-events-none" type="submit" :disabled="isLoading">
                    <span v-if="isSpinning"></span>{{ t('button.search') }}
                </button>
            </form>
        </div>
        <div class="mb-3">
            <table class="w-full">
                <thead>
                    <tr>
                        <TableHeader sortKey="machineCode" :sortBy :orderBy>{{ t('label.coating_reports.machine_code') }}</TableHeader>
                        <TableHeader sortKey="machineName" :sortBy :orderBy>{{ t('label.coating_reports.machine_name') }}</TableHeader>
                        <TableHeader sortKey="coatingDate" :sortBy :orderBy>{{ t('label.coating_reports.coating_date') }}</TableHeader>
                        <TableHeader sortKey="productCode" :sortBy :orderBy>{{ t('label.coating_reports.product_code') }}</TableHeader>
                        <TableHeader sortKey="productName" :sortBy :orderBy>{{ t('label.coating_reports.product_name') }}</TableHeader>
                        <TableHeader sortKey="coatingSqmQty" :sortBy :orderBy>{{ t('label.coating_reports.coating_sqm_qty') }}</TableHeader>
                        <TableHeader sortKey="bsIssueSqmQty" :sortBy :orderBy>{{ t('label.coating_reports.bs_issue_sqm_qty') }}</TableHeader>
                        <TableHeader sortKey="bsYield" :sortBy :orderBy>{{ t('label.coating_reports.bs_yield') }}</TableHeader>
                        <TableHeader sortKey="spIssueSqmQty" :sortBy :orderBy>{{ t('label.coating_reports.sp_issue_sqm_qty') }}</TableHeader>
                        <TableHeader sortKey="spYield" :sortBy :orderBy>{{ t('label.coating_reports.sp_yield') }}</TableHeader>
                        <TableHeader sortKey="rate" :sortBy :orderBy>{{ t('label.coating_reports.rate') }}</TableHeader>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                    <tr v-for="(coatingRecord, index) in sortedData" :key="index">
                        <td class="px-2 py-2 text-start">{{ coatingRecord.machineCode }}</td>
                        <td class="px-2 py-2 text-start">{{ coatingRecord.machineName }}</td>
                        <td class="px-2 py-2 text-start">{{ coatingRecord.coatingDate }}</td>
                        <td class="px-2 py-2 text-start">{{ coatingRecord.productCode }}</td>
                        <td class="px-2 py-2 text-start">{{ coatingRecord.productName }}</td>
                        <td class="px-2 py-2 text-end">{{ coatingRecord.coatingSqmQty }}</td>
                        <td class="px-2 py-2 text-end">{{ coatingRecord.bsIssueSqmQty }}</td>
                        <td class="px-2 py-2 text-end">{{ coatingRecord.bsYield }}</td>
                        <td class="px-2 py-2 text-end">{{ coatingRecord.spIssueSqmQty }}</td>
                        <td class="px-2 py-2 text-end">{{ coatingRecord.spYield }}</td>
                        <td class="px-2 py-2 text-end">{{ coatingRecord.rate }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        {{ errors.error }}
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
</script>