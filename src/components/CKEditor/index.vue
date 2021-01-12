<template>
		<div style="display: inline-block;width: 100%">
				<ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
		</div>
</template>

<script>
    import CKEditor from '@ckeditor/ckeditor5-vue2'
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

    export default {
        name: "CkEditor",
        components: { ClassicEditor, ckeditor: CKEditor.component},
		    props:["value"],
        data() {
            return {
                editor: ClassicEditor,
                editorConfig: {
                    // The configuration of the editor.
                }
            };
        },
        computed:{
            editorData: {
                get(){
                    return this.value
                },
                set(val){
                    this.$emit('input', val)
                }
            }
        },
        methods:{

        }
    }
</script>

<style>
		.ck-content{
				min-height: 300px;
		}
</style>