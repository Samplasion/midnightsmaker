<template>
    <div class="dark:bg-gray-900 dark:text-gray-200">
        <Head>
            <Title>Midnights Maker</Title>
            <Meta property="og:title" content="Midnights Maker"/>
            <Meta name="twitter:title" content="Midnights Maker"/>
            <Meta name="description" content="Create your own Midnights-style album cover."/>
            <Meta property="og:description" content="Create your own Midnights-style album cover."/>
            <Meta name="twitter:description" content="Create your own Midnights-style album cover."/>
            <Meta property="og:image" content="https://midnightsmaker.com/meta_image.jpg"/>
            <Meta property="twitter:image" content="https://midnightsmaker.com/meta_image.jpg"/>
            <!-- Favicon -->
            <Link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png"/>
            <Link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png"/>
            <Link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png"/>
            <Link rel="manifest" href="site.webmanifest"/>
            <Link rel="mask-icon" href="safari-pinned-tab.svg" color="#62869a"/>
            <Meta name="msapplication-TileColor" content="#e9e8e4"/>
            <Meta name="theme-color" content="#e9e8e4"/>
        </Head>
        <div class="text-center">
            <h1 class="pt-3 text-2xl font-bold">Midnights Maker</h1>
            <h3 class="text-lg font-light">Create your own Midnights-style album cover</h3>
        </div>
        <div class="flex flex-col md:flex-row justify-center items-center md:items-start w-full h-full mt-5">
            <div class="flex flex-col justify-center items-center">
                <canvas
                    ref="albumCoverCanvas"
                    width="1000"
                    height="1000"
                    class="block max-w-[800px] w-full px-3 lg:pl-0"
                >Your browser does not support this feature. Please try the latest version of Chrome, Edge, or Firefox.</canvas>
                <div class="flex flex-row justify-center items-center mt-3">
                    <button
                        v-if="supportsClipboardApi"
                        type="button"
                        class="inline-block mr-2 px-6 py-2 border-2 border-gray-800 text-gray-800 dark:border-gray-200 dark:text-gray-200 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out flex align-center"
                        @click="copyToClipboard"
                    >
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="clipboard"
                             class="w-3 mr-1" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path
                                d="M384 112v352c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h80c0-35.29 28.71-64 64-64s64 28.71 64 64h80c26.51 0 48 21.49 48 48zM192 40c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24m96 114v-20a6 6 0 0 0-6-6H102a6 6 0 0 0-6 6v20a6 6 0 0 0 6 6h180a6 6 0 0 0 6-6z"/>
                        </svg>
                        {{ copyToClipboardText }}
                    </button>
                    <button
                        type="button"
                        class="inline-block px-6 py-2 bg-green-600 text-white font-medium text-xs leading-normal uppercase rounded shadow-sm hover:bg-green-700 hover:shadow-md focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out flex align-center"
                        @click="download"
                    >
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="download"
                             class="w-3 mr-2 pt-[1px]" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path fill="currentColor"
                                  d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z">
                            </path>
                        </svg>
                        Download
                    </button>
                </div>
            </div>
            <div class="md:mr-3 mt-5 md:mt-0 mb-5 flex-col">
                <div class="text-xs mb-5">
                    <span class="block text-gray-700 dark:text-gray-300">Official themes</span>
                    <button v-for="([key, value]) of officialThemes" :key="key"
                        :title="value.name"
                        class="inline-block rounded-full h-6 w-6 transition duration-200 mt-1 align-top mr-2 cursor-pointer"
                        :class="{ 'outline outline-2 outline-black dark:outline-white': activeThemeName === key }"
                        @click="activeThemeName = key"
                        :style="`background-image: linear-gradient(to bottom right, ${value.preview.join(', ')});`"
                    />
                </div>
                <div class="text-xs mb-5">
                    <span class="block text-gray-700 dark:text-gray-300">Custom themes</span>
                    <button v-for="([key, value]) of customThemes" :key="key"
                        :title="value.name"
                        class="inline-block rounded-full h-6 w-6 transition duration-200 mt-1 align-top mr-2 cursor-pointer"
                        :class="{ 'outline outline-2 outline-black dark:outline-white': activeThemeName === key }"
                        @click="activeThemeName = key"
                        :style="`background-image: linear-gradient(to bottom right, ${value.preview.join(', ')});`"
                    />
                </div>
                <div class="text-xs mb-5" v-if="activeThemeName === 'custom'">
                    <span class="text-gray-700 dark:text-gray-300" v-if="isUpdatingCustomBackground">Album background colors</span>
                    <span class="text-gray-700 dark:text-gray-300" v-if="isUpdatingCustomForeground">Album foreground colors</span>
                    <Vue3ColorPicker
                        v-model="customBackgroundRaw"
                        v-if="isUpdatingCustomBackground"
                        mode="gradient"
                        :showColorList="false"
                        :showEyeDrop="false"
                        :showAlpha="false"
                        :showColorValue="false"
                        :showInputMenu="false"
                        theme="dark"
                        @update:modelValue="updateCustomBackground"
                    />
                    <Vue3ColorPicker
                        v-model="customForegroundRaw"
                        v-if="isUpdatingCustomForeground"
                        mode="gradient"
                        :showColorList="false"
                        :showEyeDrop="false"
                        :showAlpha="false"
                        :showColorValue="false"
                        :showInputMenu="false"
                        theme="dark"
                        @update:modelValue="updateCustomForeground"
                    />
                    <button
                        class="px-6 py-2 border-gray-800 text-gray-800 dark:border-gray-200 dark:text-gray-200 font-medium text-xs leading-normal uppercase rounded shadow-sm hover:bg-gray-700 hover:shadow-md focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out flex align-center"
                        @click="toggle"
                    >
                        Toggle edit background/text
                    </button>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                    <label class="block">
                        <span class="text-gray-700 dark:text-gray-300">Album Title</span>
                        <input
                            type="text"
                            class="text-sm mt-1 block w-full rounded-md bg-gray-100 dark:bg-gray-800 border-transparent focus:border-gray-500 focus:bg-white dark:focus:bg-black focus:ring-0"
                            v-model="albumTitle"
                        />
                    </label>
                    <label class="block">
                        <span class="text-gray-700 dark:text-gray-300">Album Subtitle</span>
                        <input
                            type="text"
                            class="text-sm mt-1 block w-full rounded-md bg-gray-100 dark:bg-gray-800 border-transparent focus:border-gray-500 focus:bg-white dark:focus:bg-black focus:ring-0"
                            v-model="albumSubtitle"
                        />
                    </label>
                    <label class="block">
                        <span class="text-gray-700 dark:text-gray-300">Album Image</span>
                        <input
                            type="file"
                            accept="image/x-png,image/gif,image/jpeg,image/webp"
                            class="text-sm mt-1 pr-1 block w-full rounded-md bg-gray-100 dark:bg-gray-800 border-transparent cursor-pointer max-w-[250px]
                            focus:border-gray-500 focus:bg-white dark:focus:bg-black focus:ring-0 focus:outline-none
                            file:rounded-md file:border file:cursor-pointer file:p-2"
                            @change="onImageChosen"
                        />
                    </label>
                    <div v-for="(section, index) in sections" :key="index">
                        <div>
                            <label class="block">
                                <span class="text-gray-700 dark:text-gray-300">Section Title</span>
                                <input
                                    type="text"
                                    class="text-sm mt-1 block w-full rounded-md bg-gray-100 dark:bg-gray-800 border-transparent focus:border-gray-500 focus:bg-white dark:focus:bg-black focus:ring-0"
                                    v-model="sections[index].title"
                                />
                            </label>
                            <div v-for="(track, tIndex) in section.tracks" :key="tIndex" class="mt-2 ml-4">
                                <label class="block">
                                    <span class="text-gray-700 dark:text-gray-300">Track Title</span>
                                    <input
                                        type="text"
                                        class="text-sm mt-1 block w-full rounded-md bg-gray-100 dark:bg-gray-800 border-transparent focus:border-gray-500 focus:bg-white dark:focus:bg-black focus:ring-0"
                                        v-model="sections[index].tracks[tIndex].name"
                                    />
                                    <span class="text-gray-700 dark:text-gray-300">Track Feat. Line</span>
                                    <input
                                        type="text"
                                        class="text-sm mt-1 block w-full rounded-md bg-gray-100 dark:bg-gray-800 border-transparent focus:border-gray-500 focus:bg-white dark:focus:bg-black focus:ring-0"
                                        v-model="sections[index].tracks[tIndex].featLine"
                                    />
                                </label>
                                <button
                                    class="px-6 py-2 border-solid border-1 border-gray-800 text-gray-800 dark:border-gray-200 dark:text-gray-200 font-medium text-xs leading-normal uppercase rounded shadow-sm hover:bg-red-700 hover:shadow-md focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out flex align-center"
                                    @click="removeTrack(index, tIndex)"
                                >
                                    Remove
                                </button>
                            </div>
                            <button
                                class="px-6 py-2 border-solid border-1 border-gray-800 text-gray-800 dark:border-gray-200 dark:text-gray-200 font-medium text-xs leading-normal uppercase rounded shadow-sm hover:bg-green-700 hover:shadow-md focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out flex align-center"
                                @click="addTrack(index)"
                            >
                                Add Track
                            </button>
                        </div>
                        <label>
                            <input
                                type="checkbox"
                                class="mt-2"
                                v-model="sections[index].isSmall"
                            />
                            <span class="ml-2 text-gray-700 dark:text-gray-300">Small Section</span>
                        </label>
                        <button
                            class="px-6 py-2 border-gray-800 text-gray-800 dark:border-gray-200 dark:text-gray-200 font-medium text-xs leading-normal uppercase rounded shadow-sm hover:bg-red-700 hover:shadow-md focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out flex align-center"
                            @click="removeSection(index)"
                        >
                            Remove Section
                        </button>
                    </div>
                    <button
                        class="px-6 py-2 bg-green-600 text-white font-medium text-xs leading-normal uppercase rounded shadow-sm hover:bg-green-700 hover:shadow-md focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out flex align-center"
                        @click="addSection"
                    >
                        Add Section
                    </button>
                </div>
            </div>
        </div>
        <div class="flex flex-col justify-center items-center mt-10 mb-3 text-xs text-gray-500">
            <div>Copyright &copy; 2022 <a href="https://github.com/waylaidwanderer" target="_blank" class="underline">waylaidwanderer</a>. All rights reserved.</div>
            <em>Album design and default image belongs to Taylor Swift.</em>
        </div>
    </div>
</template>

<script setup lang="ts">
import '@cyhnkckali/vue3-color-picker/dist/style.css'
import {Vue3ColorPicker} from '@cyhnkckali/vue3-color-picker';

// @ts-ignore
import debounce from 'lodash.debounce';

const coverX = 242;
const sidebarTextX = 24;
const sidebarTextWidth = coverX - sidebarTextX;

const debouncedRender = debounce(render, 300);
const customBackground = reactive({
    type: 'linear',
    degree: 0,
    points: [] as Record<"left" | "red" | "green" | "blue" | "alpha", number>[],
});
const customForeground = reactive({
    points: [] as Record<"left" | "red" | "green" | "blue" | "alpha", number>[],
});

const isUpdatingCustomBackground = ref(true);
const isUpdatingCustomForeground = ref(false);
const toggle = () => {
    isUpdatingCustomBackground.value = !isUpdatingCustomBackground.value;
    isUpdatingCustomForeground.value = !isUpdatingCustomForeground.value;
};
const customBackgroundRaw = ref("linear-gradient(0deg, rgb(242, 196, 208) 0%, rgb(113, 188, 217) 100%)");
const customForegroundRaw = ref("linear-gradient(0deg, rgb(27, 80, 101) 0%, rgb(191, 78, 131) 100%)");
const updateCustomBackground = (value: string) => {
    const points = [...value.matchAll(/rgb\((\d+), (\d+), (\d+)\) (\d{1,3})%/g)];
    const degree = parseInt(value.match(/(\d+)deg/g)![0]);
    customBackground.points = points.map(point => ({
        left: parseInt(point[4]),
        red: parseInt(point[1]),
        green: parseInt(point[2]),
        blue: parseInt(point[3]),
        alpha: 1,
    }));
    customBackground.degree = degree;
    render();
};
const updateCustomForeground = (value: string) => {
    const points = [...value.matchAll(/rgb\((\d+), (\d+), (\d+)\) (\d{1,3})%/g)];
    customForeground.points = points.map(point => ({
        left: parseInt(point[4]),
        red: parseInt(point[1]),
        green: parseInt(point[2]),
        blue: parseInt(point[3]),
        alpha: 1,
    }));
    render();
};

const themes = computed(() => {
    const themes = {
        moonstone_blue: {
            name: "Moonstone Blue",
            foreground: ['#536184', '#62869a', '#88a7bb'],
            background: ['#e9e8e4'],
            stops: [0],
            angle: 0,
            preview: ['#62869a', '#62869a'],
            official: true,
        },
        jade_green: {
            name: "Jade Green",
            foreground: ['#4e6861', '#799e98', '#87b2a9'],
            background: ['#e9e8e4'],
            stops: [0],
            angle: 0,
            preview: ['#799e98', '#799e98'],
            customCover: "jade_green",
            official: true,
        },
        blood_moon: {
            name: "Blood Moon",
            foreground: ['#824e4c', '#9e5653', '#ae5d59'],
            background: ['#e9e8e4'],
            stops: [0],
            angle: 0,
            preview: ['#9e5653', '#9e5653'],
            customCover: "blood_moon",
            official: true,
        },
        mahogany: {
            name: "Mahogany",
            foreground: ['#9c7b3d', '#b09254', '#bea162'],
            background: ['#e9e8e4'],
            stops: [0],
            angle: 0,
            preview: ['#b09254', '#b09254'],
            customCover: "mahogany",
            official: true,
        },
        lavender: {
            name: "Lavender",
            foreground: ['#847490', '#988a9f', '#ab9eaf'],
            background: ['#e9e8e4'],
            stops: [0],
            angle: 0,
            preview: ['#988a9f', '#988a9f'],
            official: true,
        },
        tilDawn: {
            name: 'Til Dawn Edition',
            foreground: ['#e9e8e4'],
            background: ['#0f0f2c', '#8c5a4c', '#604959', '#443749', '#474a5a'],
            stops: [0, 50, 75, 85, 100],
            angle: 75,
            preview: ['#8c5a4c', '#604959', '#443749', '#474a5a'],
            official: true,
        },
        lateNight: {
            name: 'Late Night Edition',
            foreground: ['#e9e8e4'],
            background: ['#090927', '#2d475b'],
            stops: [0, 100],
            angle: 75,
            preview: ['#090927', '#2d475b'],
            official: true,
        },
        debut: {
            name: 'Taylor Swift',
            foreground: ['#11794c', '#00b0bd'],
            background: ['#e9e8e4'],
            stops: [0, 100],
            angle: 75,
            preview: ['#34f3ff', '#6aebb4'],
            official: false,
        },
        fearless: {
            name: 'Fearless',
            foreground: ['#a5764a', '#957341'],
            background: ['#e9e8e4'],
            stops: [0, 100],
            angle: 75,
            preview: ['#f6ed95', '#ddc477'],
            official: false,
        },
        speak_now: {
            name: 'Speak Now',
            foreground: ['#513163', '#a64477'],
            background: ['#e9e8e4'],
            stops: [0, 100],
            angle: 75,
            preview: ['#513163', '#a64477'],
            official: false,
        },
        red: {
            name: 'Red',
            foreground: ['#692a40', '#b11a46'],
            background: ['#e9e8e4'],
            stops: [0, 100],
            angle: 75,
            preview: ['#692a40', '#b11a46'],
            official: false,
        },
        nineteen_eightynine: {
            name: '1989',
            foreground: ['#527da0', '#6c93b2'],
            background: ['#d7d2c5'],
            stops: [0, 100],
            angle: 75,
            preview: ['#527da0', '#6c93b2'],
            official: false,
        },
        reputation: {
            name: 'reputation',
            foreground: ['#999999', '#e9e8e4'],
            background: ['#000000', '#222222'],
            stops: [0, 100],
            angle: 75,
            preview: ['#000000', '#222222'],
            official: false,
        },
        lover: {
            name: 'Lover',
            foreground: ['#418cd8', '#d55dad'],
            background: ['#e9e8e4'],
            stops: [0, 100],
            angle: 75,
            preview: ['#94bfe9', '#eaadd6'],
            official: false,
        },
        folklore: {
            name: 'folklore',
            foreground: ['#222222', '#7f7f7f'],
            background: ['#e9e8e4'],
            stops: [0, 100],
            angle: 75,
            preview: ['#222222', '#7f7f7f'],
            official: false,
        },
        evermore: {
            name: 'evermore',
            foreground: ['#523211', '#7f3c10', '#9e4c15'],
            background: ['#e9e8e4'],
            stops: [0, 100],
            angle: 75,
            preview: ['#523211', '#7f3c10', '#9e4c15'],
            official: false,
        },
        custom: {
            name: 'Custom',
            foreground: [''],
            background: [''],
            stops: [0],
            angle: 0,
            preview: [''],
            official: false,
        },
    };

    const foregroundColors = [];
    for (let i = 0; i < customForeground.points.length; i++) {
        const point = customForeground.points[i];
        foregroundColors.push(`rgb(${point.red}, ${point.green}, ${point.blue})`);
    }

    const backgroundColors = [];
    const stops = [];
    for (let i = 0; i < customBackground.points.length; i++) {
        const point = customBackground.points[i];
        backgroundColors.push(`rgb(${point.red}, ${point.green}, ${point.blue})`);
        stops.push(point.left);
    }

    themes.custom = {
        name: "Custom",
        foreground: foregroundColors,
        background: backgroundColors,
        stops,
        angle: customBackground.degree,
        preview: backgroundColors,
        official: false,
    };

    return themes;
});

type UnwrapRef<T> = T extends Ref<infer V> ? V : T;
type Theme = keyof UnwrapRef<typeof themes>;

const themeEntries: ComputedRef<[Theme, any][]> = computed(() => Object.entries(themes.value) as any);
const officialThemes = computed(() => themeEntries.value.filter(([key, value]) => value.official));
const customThemes = computed(() => themeEntries.value.filter(([key, value]) => !value.official));

const albumCoverCanvas: Ref<HTMLCanvasElement | null> = ref(null);
const supportsClipboardApi = ref(false);
const copyToClipboardText = ref('Copy to Clipboard');
const croppedAlbumImage: Ref<string | null> = ref(null);
const activeThemeName: Ref<Theme> = ref('tilDawn');

const albumTitle = ref('Midnights');
const albumSubtitle = ref('(The Til Dawn Edition)');
const albumImage = ref('img/cover_image_moonstone_blue.jpg');
const sections = reactive([
    {
        title: "",
        tracks: [
            {
                name: "Lavender Haze",
                featLine: null,
            },
            {
                name: "Maroon",
                featLine: null,
            },
            {
                name: "Anti-Hero",
                featLine: null,
            },
            {
                name: "Snow On The Beach",
                featLine: null,
            },
            {
                // \u2009 is a thin space
                name: "You're\u2009On\u2009Your\u2009Own,\u2009Kid",
                featLine: null,
            },
            {
                name: "Midnight Rain",
                featLine: null,
            },
            {
                name: "Question...?",
                featLine: null,
            },
            {
                name: "Vigilante Shit",
                featLine: null,
            },
            {
                name: "Bejeweled",
                featLine: null,
            },
            {
                name: "Labyrinth",
                featLine: null,
            },
            {
                name: "Karma",
                featLine: null,
            },
            {
                name: "Sweet Nothing",
                featLine: null,
            },
            {
                name: "Mastermind",
                featLine: null,
            },
        ],
        isSmall: false,
    },
    {
        title: "3am Tracks",
        tracks: [
            {
                name: "The Great War",
                featLine: null,
            },
            {
                name: "Bigger Than The Whole Sky",
                featLine: null,
            },
            {
                name: "Paris",
                featLine: null,
            },
            {
                name: "High Infidelity",
                featLine: null,
            },
            {
                name: "Glitch",
                featLine: null,
            },
            {
                name: "Would've, Could've, Should've",
                featLine: null,
            },
            {
                name: "Dear Reader",
                featLine: null,
            },
        ],
        isSmall: true,
    },
    {
        title: "Til Dawn Tracks",
        tracks: [
            {
                name: "Hits Different",
                featLine: null,
            },
            {
                name: "Snow On The Beach",
                featLine: "(Feat. More Lana Del Rey)",
            },
            {
                name: "Karma",
                featLine: "(Feat. Ice Spice)",
            },
        ],
        isSmall: true,
    },
]);

const activeTheme = computed(() => themes.value[activeThemeName.value]);

watch(albumImage, () => {
    croppedAlbumImage.value = null;
});
watch(activeThemeName, () => {
    if (!albumImage.value.startsWith('img/')) {
        return;
    }
    if ("customCover" in activeTheme.value) {
        albumImage.value = `img/cover_image_${activeTheme.value.customCover}.jpg`;
    } else {
        albumImage.value = `img/cover_image_moonstone_blue.jpg`;
    }
});
watch([
    albumTitle,
    albumSubtitle,
    albumImage,
    sections,
    activeTheme,
], () => {
    debouncedRender();
});

onMounted(async () => {
    document.querySelector("body")?.classList.add("dark:bg-gray-900", "dark:text-gray-200");

    // @ts-ignore
    window.WebFontConfig = {
        google: {
            // families: ['Roboto:300,400,500,700', 'Helvetica Neue:300,400,500,700'],
        },
        active: () => render(),
    };

    if (document.getElementsByTagName("html")[0].classList.contains('wf-active')) {
        render();
    } else {
        (function(d) {
            const wf = d.createElement('script'), s = d.scripts[0];
            wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js';
            wf.async = true;
            s.parentNode!.insertBefore(wf, s);
        })(document);
    }

    supportsClipboardApi.value = typeof ClipboardItem === 'function';

    updateCustomBackground(customBackgroundRaw.value);
    updateCustomForeground(customForegroundRaw.value);
});

function copyToClipboard() {
    copyToClipboardText.value = 'Copy to Clipboard';
    albumCoverCanvas.value!.toBlob(function(blob) {
        const item = new ClipboardItem({ 'image/png': blob! });
        navigator.clipboard.write([item]);
        copyToClipboardText.value = 'Copied to Clipboard';
        setTimeout(function() {
            copyToClipboardText.value = 'Copy to Clipboard';
        }, 3000);
    });
}

function download() {
    const canvasImage = albumCoverCanvas.value!.toDataURL('image/png').replace("image/png", "image/octet-stream");
    const link = document.createElement('a');
    const fileName = `midnightsmaker-com_${slugify(albumTitle.value || 'midnights')}`.slice(0, 199);
    link.download = `${fileName}.png`;
    link.href = canvasImage;
    link.click();
}

function addSection() {
    sections.push({
        title: 'New Section',
        tracks: [],
        isSmall: false,
    });
    // sections.value = [...sections.value];
}

function removeSection(sectionIndex: number) {
    sections.splice(sectionIndex, 1);
}

function addTrack(sectionIndex: number) {
    sections[sectionIndex].tracks.push({
        name: 'New Track',
        featLine: null,
    });
}

function removeTrack(sectionIndex: number, trackIndex: number) {
    sections[sectionIndex].tracks.splice(trackIndex, 1);
}

function onImageChosen(e: any) {
    if (e.target!.files.length <= 0) {
        return;
    }
    const reader = new FileReader();
    reader.onload = function(e) {
        albumImage.value = e.target!.result!.toString();
    };
    reader.readAsDataURL(e.target.files[0]);
}

let coverImage: HTMLImageElement | null = null;
async function render() {
    const canvas = albumCoverCanvas.value!;
    const letterSpacing = canvas.style.letterSpacing;
    const ctx = canvas.getContext('2d')!;

    const font = "Helvetica Neue";

    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // background color
    const angle = activeTheme.value.angle * Math.PI / 180;
    var x2 = canvas.width * Math.cos(angle);  // angle in radians
    var y2 = canvas.height * Math.sin(angle);  // angle in radians
    const bgGradient = ctx.createLinearGradient(0, 0, x2, y2);
    for (let i = 0; i < activeTheme.value.background.length; i++) {
        bgGradient.addColorStop(activeTheme.value.stops[i] / 100, activeTheme.value.background[i]);
    }
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0,0, canvas.width, canvas.height);

    // watermark
    const watermarkGradient: {offset: number, color: string}[] = [];

    watermarkGradient.push({ offset: 0, color: activeTheme.value.foreground[0] });
    if (activeTheme.value.foreground.length > 2) {
        watermarkGradient.push({ offset: 0.25, color: activeTheme.value.foreground[1] });
        watermarkGradient.push({ offset: 1, color: activeTheme.value.foreground[2] });
    } else if (activeTheme.value.foreground.length > 1) {
        watermarkGradient.push({ offset: 1, color: activeTheme.value.foreground[1] });
    } else {
        watermarkGradient.push({ offset: 1, color: activeTheme.value.foreground[0] });
    }
    ctx.font = `300 16px ${font}`;
    console.log(activeTheme.value);
    addGradientText(ctx, 'made with midnightsmaker.com', 10, 24, watermarkGradient, ctx.measureText('made with midnightsmaker.com').width);

    // album title
    canvas.style.letterSpacing = '-2.3px';
    ctx.font = `700 78px ${font}`;
    // gradient for album title
    const fgGradient = ctx.createLinearGradient(233, 0, 233 + ctx.measureText(albumTitle.value).width, 0);
    fgGradient.addColorStop(0, activeTheme.value.foreground[0]);
    if (activeTheme.value.foreground.length > 2) {
        fgGradient.addColorStop(0.45, activeTheme.value.foreground[1]);
        fgGradient.addColorStop(1, activeTheme.value.foreground[2]);
    } else if (activeTheme.value.foreground.length > 1) {
        fgGradient.addColorStop(1, activeTheme.value.foreground[1]);
    } else {
        fgGradient.addColorStop(1, activeTheme.value.foreground[0]);
    }
    ctx.fillStyle = fgGradient;
    ctx.fillText(albumTitle.value, 237, 190 / 0.8 + 4, 737);
    const albumTitleWidth = ctx.measureText(albumTitle.value).width;

    // restore letterSpacing
    canvas.style.letterSpacing = "0.4px";

    // album subtitle
    ctx.font = `400 24px ${font}`;
    ctx.fillText(albumSubtitle.value, 234 + albumTitleWidth + 18, 190 / 0.8 + 4, 737);

    // restore letterSpacing
    canvas.style.letterSpacing = letterSpacing;

    const sideGradient: {offset: number, color: string}[] = [];

    if (activeTheme.value.foreground.length > 2) {
        sideGradient.push({ offset: 0, color: activeTheme.value.foreground[2] });
        sideGradient.push({ offset: 0.25, color: activeTheme.value.foreground[1] });
        sideGradient.push({ offset: 1, color: activeTheme.value.foreground[0] });
    } else if (activeTheme.value.foreground.length > 1) {
        sideGradient.push({ offset: 0, color: activeTheme.value.foreground[1] });
        sideGradient.push({ offset: 1, color: activeTheme.value.foreground[0] });
    } else {
        sideGradient.push({ offset: 0, color: activeTheme.value.foreground[0] });
        sideGradient.push({ offset: 1, color: activeTheme.value.foreground[0] });
    }

    const sectionTitleHeight = (isSmall: boolean) => isSmall ? 25 : 31;
    const trackTitleHeight = (isSmall: boolean) => isSmall ? 17.4 : 21.4;
    const bigFontSize = 19;
    const smallFontSize = 15;
    const afterSectionSpacing = (isSmall: boolean) => isSmall ? 12 : 6;

    const boldFont = (isSmall: boolean) => isSmall ? `500 ${smallFontSize}px ${font}` : `500 ${bigFontSize}px ${font}`;
    const regularFont = (isSmall: boolean) => isSmall ? `400 ${smallFontSize}px ${font}` : `400 ${bigFontSize}px ${font}`;

    console.log(sections.flatMap(section => [section.title, ...section.tracks.map(track => track.name)]).map(text => ctx.measureText(text).width));
    const sideGradientWidth = Math.max(...sections.flatMap(section => [section.title, ...section.tracks.map(track => track.name)]).map(text => ctx.measureText(text).width));

    const previousFontData = ctx.font;
    let currentSectionStart = canvas.height - sections.reduce((acc, section) => {
        let currentHeight = 0;
        currentHeight += sectionTitleHeight(!!section.isSmall);
        // currentHeight += trackTitleHeight(!!section.isSmall) * section.tracks.length;
        ctx.font = section.isSmall ? `500 ${smallFontSize}px ${font}` : `500 ${bigFontSize}px ${font}`;
        section.tracks.forEach((track) => {
            ctx.font = boldFont(section.isSmall);
            const titleLength = track.name ? ctx.measureText(track.name).width : 0;
            ctx.font = regularFont(section.isSmall);
            const spaceLength = ctx.measureText((titleLength ? " " : "")).width;
            const featLineLength = ctx.measureText(track.featLine!).width;
            if (titleLength + spaceLength + featLineLength > sidebarTextWidth) {
                currentHeight += trackTitleHeight(!!section.isSmall) * (
                    getTextLines(ctx, track.featLine ?? "").length);
            }
            currentHeight += trackTitleHeight(!!section.isSmall) *
                Math.max(1, getTextLines(ctx, track.name).length);
        });
        currentHeight += afterSectionSpacing(!!section.isSmall);
        return acc + currentHeight;
    }, 0);
    ctx.font = previousFontData;
    
    for (const section of sections) {
        // section title
        ctx.font = regularFont(section.isSmall);
        addGradientText(ctx, section.title, sidebarTextX, currentSectionStart, sideGradient, sideGradientWidth);
        if (section.title !== '')
            textUnderline(ctx, section.title, sidebarTextX, currentSectionStart, 18, sideGradient);

        // section tracks
        let lines = 0;
        for (let i = 0; i < section.tracks.length; i++) {
            ctx.font = boldFont(section.isSmall);

            let newLines = addGradientLongText(
                ctx, 
                section.tracks[i].name, 
                sidebarTextX,
                currentSectionStart + sectionTitleHeight(section.isSmall) + trackTitleHeight(section.isSmall) * lines,
                sideGradient, sideGradientWidth,
                trackTitleHeight(section.isSmall),
            );

            if (section.tracks[i].featLine) {
                ctx.font = boldFont(section.isSmall);
                const titleLength = section.tracks[i].name ? ctx.measureText(section.tracks[i].name).width : 0;
                ctx.font = regularFont(section.isSmall);
                const spaceLength = ctx.measureText((titleLength ? " " : "")).width;
                const featLineLength = ctx.measureText(section.tracks[i].featLine!).width;

                if (titleLength + spaceLength + featLineLength > sidebarTextWidth) {
                    newLines += addGradientLongText(
                        ctx, 
                        section.tracks[i].featLine!,
                        sidebarTextX,
                        currentSectionStart + sectionTitleHeight(section.isSmall) + trackTitleHeight(section.isSmall) * (lines + 1),
                        sideGradient, sideGradientWidth,
                        trackTitleHeight(section.isSmall),
                    );
                } else {
                    addGradientText(
                        ctx, 
                        section.tracks[i].featLine!,
                        sidebarTextX + spaceLength + titleLength,
                        currentSectionStart + sectionTitleHeight(section.isSmall) + trackTitleHeight(section.isSmall) * lines,
                        sideGradient, sideGradientWidth,
                    );
                }
            }

            lines += newLines;
        }

        currentSectionStart += sectionTitleHeight(section.isSmall) + trackTitleHeight(section.isSmall) * lines + afterSectionSpacing(section.isSmall);
    }

    // album image
    if (!croppedAlbumImage.value) {
        croppedAlbumImage.value = (await crop(albumImage.value, 767 / 727)).toDataURL();
    }
    if (!coverImage) {
        coverImage = new Image();
        coverImage.onload = () => {
            const imageWidth = 759;
            const imageHeight = 729;
            ctx.drawImage(coverImage!, 0, 0, coverImage!.width, coverImage!.height, 242, 272, imageWidth, imageHeight);
        };
    }
    coverImage.src = croppedAlbumImage.value;
}

// TODO: Make this better
function getTextLines(ctx: CanvasRenderingContext2D, text: string) {
    const words = text.split(' ');
    let currentLine = '';
    const lines: string[] = [];
    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        if (ctx.measureText(currentLine + word).width > sidebarTextWidth) {
            lines.push(currentLine.trim());
            currentLine = word + ' ';
        } else {
            currentLine += word + ' ';
        }
    }
    lines.push(currentLine.trim());
    if (lines[0] === '') {
        lines.shift();
    }
    return lines;
}

function addGradientLongText(ctx: CanvasRenderingContext2D, text: string, x: number, y: any, gradientStops: any, gradientWidth: any, lineHeight: number, indentation = 12) {
    const words = text.split(' ');
    let linesPrinted = 0;
    let currentLine = '';
    let currentY = y;
    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const currentIndentation = linesPrinted == 0 ? 0 : indentation;
        if (ctx.measureText(currentLine + word).width > sidebarTextWidth - currentIndentation) {
            addGradientText(ctx, currentLine, x + currentIndentation, currentY, gradientStops, gradientWidth);
            currentLine = word + ' ';
            if (i > 0) {
                linesPrinted++;
                currentY += lineHeight;
            }
        } else {
            currentLine += word + ' ';
        }
    }
    addGradientText(ctx, currentLine, x + (linesPrinted == 0 ? 0 : indentation), currentY, gradientStops, gradientWidth);
    linesPrinted++;
    return linesPrinted;
}

function addGradientText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, gradientStops: any[], gradientWidth: number) {
    const gradient = ctx.createLinearGradient(x, 0, x + gradientWidth, 0);
    gradientStops.forEach((stop: { offset: any; color: any; }) => gradient.addColorStop(stop.offset, stop.color));
    // Fill with gradient
    ctx.fillStyle = gradient;
    ctx.fillText(text, x, y, sidebarTextWidth);
}

function textUnderline(context: CanvasRenderingContext2D, text: string, x: number, y: number, textSize: number, gradientStops: any[]) {
    const textWidth = context.measureText(text).width;
    let startX;
    const startY = y + (textSize / 15) + 2;
    let endX;
    const endY = startY;
    const underlineHeight = 1.5;

    context.beginPath();
    startX = x;
    endX = x + textWidth + 1;

    const gradient = context.createLinearGradient(x, 0, x + textWidth, 0);
    gradientStops.forEach((stop: { offset: any; color: any; }) => gradient.addColorStop(stop.offset, stop.color));
    context.strokeStyle = gradient;
    // noinspection JSSuspiciousNameCombination
    context.lineWidth = underlineHeight;
    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.stroke();
}

/**
 * https://pqina.nl/blog/cropping-images-to-an-aspect-ratio-with-javascript/
 * @param {string} url - The source image
 * @param {number} aspectRatio - The aspect ratio
 * @return {Promise<HTMLCanvasElement>} A Promise that resolves with the resulting image as a canvas element
 */
function crop(url: string, aspectRatio: number): Promise<HTMLCanvasElement> {
    // we return a Promise that gets resolved with our canvas element
    return new Promise((resolve) => {
        // this image will hold our source image data
        const inputImage = new Image();

        // we want to wait for our image to load
        inputImage.onload = () => {
            // let's store the width and height of our image
            const inputWidth = inputImage.naturalWidth;
            const inputHeight = inputImage.naturalHeight;

            // get the aspect ratio of the input image
            const inputImageAspectRatio = inputWidth / inputHeight;

            // if it's bigger than our target aspect ratio
            let outputWidth = inputWidth;
            let outputHeight = inputHeight;
            if (inputImageAspectRatio > aspectRatio) {
                outputWidth = inputHeight * aspectRatio;
            } else if (inputImageAspectRatio < aspectRatio) {
                outputHeight = inputWidth / aspectRatio;
            }

            // calculate the position to draw the image at
            const outputX = (outputWidth - inputWidth) * 0.5;
            const outputY = (outputHeight - inputHeight) * 0.5;

            // create a canvas that will present the output image
            const outputImage = document.createElement('canvas');

            // set it to the same size as the image
            outputImage.width = outputWidth;
            outputImage.height = outputHeight;

            // draw our image at position 0, 0 on the canvas
            const ctx = outputImage.getContext('2d')!;
            ctx.drawImage(inputImage, outputX, outputY);
            resolve(outputImage);
        };

        // start loading our image
        inputImage.src = url;
    });
}

/**
 * https://lucidar.me/en/web-dev/how-to-slugify-a-string-in-javascript/
 */
function slugify(str: string): string {
    str = str.replace(/^\s+|\s+$/g, '');

    // Make the string lowercase
    str = str.toLowerCase();

    // Remove accents, swap ñ for n, etc
    const from = 'ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;';
    const to = 'AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------';
    for (let i = 0, l = from.length; i < l; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    // Remove invalid chars
    str = str.replace(/[^a-z0-9 -]/g, '')
        // Collapse whitespace and replace by -
        .replace(/\s+/g, '-')
        // Collapse dashes
        .replace(/-+/g, '-');

    return str;
}
</script>

<style>
html {
    font-family: 'Roboto', sans-serif;
}
</style>
