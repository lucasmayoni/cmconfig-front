<template>
    <div>
        <b-alert
                :show="dismissCountDown"
                dismissible
                variant="success"
                @dismissed="dismissCountDown=0"
                @dismiss-count-down="countDownChanged"
                class="position-fixed fixed-top m-0 rounded-0"
                style="z-index: 2000;"
        >
            <p>Se agrego el CableModem al listado de dispositivos validos.</p>
            <b-progress
                    variant="success"
                    :max="dismissSecs"
                    :value="dismissCountDown"
                    height="4px"
            ></b-progress>
        </b-alert>
        <b-table
            id="vendorTable"
            :search-input="searchTxt"
            :items="vendors"
            :fields="fields"
            striped
            small
            bordered
            responsive
            hover>
            <template v-slot:cell(actions)="{ item }">
                <b-btn class="sm" @click="showMsgBoxOne(item)">
                    Agregar Modelo
                </b-btn>
            </template>
        </b-table>
        <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            current-page="currentPage"
            aria-controls="vendorTable"
            @input="getVendors(currentPage)"/>
    </div>
</template>
<script>
import VendorService from '../../services/vendors'
export default {
    name: 'vendor',
    components: {  },
    data() {
        return {
            dismissSecs: 2,
            dismissCountDown: 0,
            fields: [{key:'modem_macaddr','sortable':false,label:'MAC Address'},
                {key:'ipaddr','sortable':false, label:'IP Address'},
                {key:'vsi_model', 'sortable':false,label:'Modelo'},
                {key:'vsi_vendor',sortable:false,label:'Vendor'},
                {key:'vsi_swver',sortable:false,label:'Version de SW'},
                {key:'actions',label:'Agregar'},
            ],
            vendors: [],
            searchTxt: '',
            currentPage: 1,
            perPage: 20,
            lastPage: 1,
            resultCount: 0
        }
    },
    computed: {
        rows() {
            return this.resultCount;
        }
    },
    created() {
        this.getVendors();
    },
    methods :{
        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown
        },
        showAlert() {
            this.dismissCountDown = this.dismissSecs
        },
        showMsgBoxOne(item){
            this.$bvModal.msgBoxConfirm('Desea agregar el modelo')
                .then(value => {
                    if( value) {
                        VendorService.addVendor(item)
                            .then(response  => {
                                let res = response.data;
                                if (res.success) {
                                    this.showAlert();
                                    this.getVendors();
                                }
                            })
                            .catch((err) => {
                                // eslint-disable-next-line no-console
                                console.log(err)
                            })
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        },
        setSearchQuery(value) {
            this.searchTxt = value;
            this.getVendors();
        },
        setPage: function(pageNumber) {
            this.currentPage = pageNumber
        },
        getVendors (page = 1) {
            this.currentPage = page;
            let paramsListar = {
                page: this.currentPage,
                searchTxt: this.searchTxt,
            };
            VendorService.searchVendors(paramsListar)
                .then(response  => {
                    let res = response.data;
                    if (res.success) {
                        this.vendors = res.data.data;
                        this.resultCount = res.data.total;
                    }
                })
                .catch((err) => {
                    // eslint-disable-next-line no-console
                    console.log(err)
                })
        }
    }
}
</script>