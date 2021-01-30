import { PluginObject, VueConstructor } from 'vue';
import VueI18n from 'vue-i18n';
import velocity from 'velocity-animate';
import SvgIcon from 'vue-svgicon';
import VueCompositionApi from '@vue/composition-api';
import Notifications from 'vue-notification';
import Fragment from 'vue-fragment';
import VTooltip from 'v-tooltip';
import '@/styles/style.pcss';
import { i18n } from '@/translations';

interface SpaceoneDSOptions {
    appSelector?: string;
}


const SpaceoneDS: PluginObject<SpaceoneDSOptions> = {
    install(_Vue: VueConstructor, options) {
        _Vue.use(VueI18n);
        _Vue.use(VueCompositionApi);
        _Vue.use(Notifications, { velocity });
        _Vue.use(SvgIcon, {
            tagName: 'svgicon',
            classPrefix: 'p-i',
        });

        _Vue.use(Fragment.Plugin);
        _Vue.use(VTooltip, { defaultClass: 'p-tooltip', defaultBoundariesElement: document.body });

        _Vue.prototype.$spaceoneDS = { lang: i18n };
    },
};


export default SpaceoneDS;

/* Languages */
export { messages } from './translations';

/* Components */
export { default as PBackToTopButton } from './navigation/scrolls/back-to-top-button/PBackToTopButton.vue';
export { default as PBadge } from './data-display/badges/PBadge.vue';
export { default as PButton } from './atoms/buttons/PButton.vue';
export { default as PEmpty } from './data-display/empty/PEmpty.vue';
export { default as PHr } from './atoms/hr/PHr.vue';
export { default as PI } from './atoms/icons/PI.vue';
export { default as PTextInput } from './atoms/inputs/PTextInput.vue';
export { default as PLabel } from './atoms/labels/PLabel.vue';
export { default as PSkeleton } from './feedbacks/loading/skeleton/PSkeleton.vue';
export { default as PCollapsibleToggle } from './atoms/collapsible-toggle/PCollapsibleToggle.vue';

export { default as PNoticeAlert } from './feedbacks/alert/notice/PNoticeAlert.vue';
export { default as PToastAlert } from './feedbacks/alert/toast/PToastAlert.vue';
export { default as PAnchor } from './molecules/anchors/PAnchor.vue';
export { default as PCopyButton } from './molecules/buttons/copy-button/PCopyButton.vue';
export { default as PIconButton } from './molecules/buttons/icon-button/PIconButton.vue';
export { default as PIconTextButton } from './molecules/buttons/icon-text-button/PIconTextButton.vue';
export { default as PLoadingButton } from './molecules/buttons/loading-button/PLoadingButton.vue';
export { default as PToggleButton } from './molecules/buttons/toggle-button/PToggleButton.vue';
export { default as PCardItem } from './molecules/cards/PCardItem.vue';
export { default as PCollapsiblePanel } from './data-display/collapsible/collapsible-panel/PCollapsiblePanel.vue';
export { default as PCheckBox } from './molecules/forms/checkbox/PCheckBox.vue';
export { default as PFieldGroup } from './molecules/forms/field-group/PFieldGroup.vue';
export { default as PRadio } from './molecules/forms/radio/PRadio.vue';
export { default as PGridLayout } from './molecules/layouts/grid-layout/PGridLayout.vue';
export { default as PPaneLayout } from './molecules/layouts/pane-layout/PPaneLayout.vue';
export { default as PSidebar } from './molecules/layouts/sidebar/PSidebar.vue';
export { default as PTextList } from './molecules/lists/text-list/PTextList.vue';
export { default as PLottie } from './molecules/lottie/PLottie.vue';
export { default as PMarkdown } from './data-display/markdown/PMarkdown.vue';
export { default as PModal } from './feedbacks/modals/modal/PModal.vue';
export { default as PBreadcrumbs } from './navigation/breadcrumbs/PBreadcrumbs.vue';
export { default as PPanelTop } from './data-display/titles/panel-top/PPanelTop.vue';
export { default as PProgressBar } from './data-display/progress-bar/PProgressBar.vue';
export { default as PSearch } from './molecules/search/PSearch.vue';
export { default as PSelectableItem } from './molecules/selectable-item/PSelectableItem.vue';
export { default as PStatus } from './data-display/status/PStatus.vue';
export { default as PProgressTabBar } from './molecules/tabs/progress-tab-bar/PProgressTabBar.vue';
export { default as PTabBar } from './molecules/tabs/tab-bar/PTabBar.vue';
export { default as PTag } from './data-display/tags/PTag.vue';
export { default as PTextEditor } from './molecules/text-editor/text-editor/PTextEditor.vue';
export { default as PTooltip } from './data-display/tooltips/PTooltip.vue';
export { default as PTreeNode } from './data-display/tree/tree-node/PTreeNode.vue';

export { default as PSelectBtnGroup } from './organisms/buttons/select-btn-group/PSelectBtnGroup.vue';
export { default as PTooltipButton } from './organisms/buttons/tooltip-button/PTooltipButton.vue';
export { default as PChartLoader } from './organisms/charts/chart-loader/PChartLoader.vue';
export { default as PMetricChart } from './organisms/charts/metric-chart/PMetricChart.vue';
export { default as PContextMenu } from './organisms/context-menu/PContextMenu.vue';
export { default as PDatePagination } from './navigation/pagination/date-pagination/PDatePagination.vue';
export { default as PDefinition } from './organisms/definition/PDefinition.vue';
export { default as PDropdownBtn } from './organisms/dropdown/dropdown-btn/PDropdownBtn.vue';
export { default as PSelectDropdown } from './organisms/dropdown/select-dropdown/PSelectDropdown.vue';
export { default as PDropdownMenuBtn } from './organisms/dropdown/dropdown-menu-btn/PDropdownMenuBtn.vue';
export { default as PDynamicField } from './organisms/dynamic-field/PDynamicField.vue';
export { default as PDynamicLayout } from './organisms/dynamic-layout/PDynamicLayout.vue';
export { default as PJsonSchemaForm } from './organisms/forms/json-schema-form/PJsonSchemaForm.vue';
export { default as PBoardLayout } from './organisms/layouts/board-layout/PBoardLayout.vue';
export { default as PHorizontalLayout } from './organisms/layouts/horizontal-layout/PHorizontalLayout.vue';
export { default as PSearchGridLayout } from './organisms/layouts/search-grid-layout/PSearchGridLayout.vue';
export { default as PToolboxGridLayout } from './organisms/layouts/toolbox-grid-layout/PToolboxGridLayout.vue';
export { default as PVerticalLayout } from './organisms/layouts/vertical-layout/PVerticalLayout.vue';
export { default as PWidgetLayout } from './organisms/layouts/widget-layout/PWidgetLayout.vue';
export { default as PLazyImg } from './feedbacks/loading/lazy-img/PLazyImg.vue';
export { default as PSelectableList } from './organisms/lists/selectable-list/PSelectableList.vue';
export { default as PButtonModal } from './feedbacks/modals/button-modal/PButtonModal.vue';
export { default as PContentModal } from './others/modals/content-modal/PContentModal.vue';
export { default as PDoubleCheckModal } from './others/modals/double-check-modal/PDoubleCheckModal.vue';
export { default as PIconModal } from './feedbacks/modals/icon-modal/PIconModal.vue';
export { default as PTableCheckModal } from './others/modals/table-modal/PTableCheckModal.vue';
export { default as PPagination } from './navigation/pagination/pagination/PPagination.vue';
export { default as PTextPagination } from './navigation/pagination/text-pagination/PTextPagination.vue';
export { default as PRawData } from './data-display/raw-data/PRawData.vue';
export { default as PAutocompleteSearch } from './organisms/search/autocomplete-search/PAutocompleteSearch.vue';
export { default as PQuerySearch } from './organisms/search/query-search/PQuerySearch.vue';
export { default as PQuerySearchGuide } from './organisms/search/query-search-guide/PQuerySearchGuide.vue';
export { default as PQuerySearchTags } from './organisms/search/query-search-tags/PQuerySearchTags.vue';
export { default as PDataTable } from './data-display/tables/data-table/PDataTable.vue';
export { default as PDefinitionTable } from './data-display/tables/definition-table/PDefinitionTable.vue';
export { default as PQuerySearchTable } from './data-display/tables/query-search-table/PQuerySearchTable.vue';
export { default as PSearchTable } from './data-display/tables/search-table/PSearchTable.vue';
export { default as PToolboxTable } from './data-display/tables/toolbox-table/PToolboxTable.vue';
export { default as PButtonTab } from './others/tabs/button-tab/PButtonTab.vue';
export { default as PTab } from './navigation/tabs/tab/PTab.vue';
export { default as PPageTitle } from './data-display/titles/page-title/PPageTitle.vue';
export { default as PTree } from './data-display/tree/PTree.vue';
export { default as PProgressWizard } from './navigation/wizards/progress-wizard/PProgressWizard.vue';

export { default as PNotificationBar } from './feedbacks/notification/PNotificationBar.vue';
export { default as PDataLoader } from './feedbacks/loading/data-loader/PDataLoader.vue';

export { default as PToolbox } from './navigation/toolbox/PToolbox.vue';
