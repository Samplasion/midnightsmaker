<template>
    <div>
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
                        class="inline-block mr-2 px-6 py-2 border-2 border-gray-800 text-gray-800 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out flex align-center"
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
                    <span class="block text-gray-700">Theme</span>
                    <button v-for="([key, value]) of themeEntries" :key="key"
                        :title="value.name"
                        class="inline-block rounded-full h-6 w-6 transition duration-200 mt-1 align-top mr-2 cursor-pointer"
                        :class="{ 'outline outline-2 outline-black': activeThemeName === key }"
                        :style="`background-image: linear-gradient(to bottom right, ${value.colors.join(', ')});`"
                        @click="activeThemeName = key"
                    />
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                    <label class="block">
                        <span class="text-gray-700">Album Title</span>
                        <input
                            type="text"
                            class="text-sm mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                            v-model="albumTitle"
                        />
                    </label>
                    <label class="block">
                        <span class="text-gray-700">Album Subtitle</span>
                        <input
                            type="text"
                            class="text-sm mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                            v-model="albumSubtitle"
                        />
                    </label>
                    <label class="block">
                        <span class="text-gray-700">Album Image</span>
                        <input
                            type="file"
                            accept="image/x-png,image/gif,image/jpeg,image/webp"
                            class="text-sm mt-1 pr-1 block w-full rounded-md bg-gray-100 border-transparent cursor-pointer max-w-[250px]
                            focus:border-gray-500 focus:bg-white focus:ring-0 focus:outline-none
                            file:rounded-md file:border file:cursor-pointer file:p-2"
                            @change="onImageChosen"
                        />
                    </label>
                    <div v-for="(section, index) in sections" :key="index">
                        <div>
                            <label class="block">
                                <span class="text-gray-700">Section Title</span>
                                <input
                                    type="text"
                                    class="text-sm mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                                    v-model="sections[index].title"
                                />
                            </label>
                            <div v-for="(track, tIndex) in section.tracks" :key="tIndex">
                                <label class="block mt-2 ml-4">
                                    <span class="text-gray-700">Track Title</span>
                                    <input
                                        type="text"
                                        class="text-sm mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                                        v-model="sections[index].tracks[tIndex]"
                                    />
                                </label>
                                <button
                                    class="px-6 py-2 border-gray-800 text-gray-800 font-medium text-xs leading-normal uppercase rounded shadow-sm hover:bg-red-700 hover:shadow-md focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out flex align-center"
                                    @click="removeTrack(index, tIndex)"
                                >
                                    Remove
                                </button>
                            </div>
                            <button
                                class="px-6 py-2 border-gray-800 text-gray-800 font-medium text-xs leading-normal uppercase rounded shadow-sm hover:bg-green-700 hover:shadow-md focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out flex align-center"
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
                            <span class="ml-2 text-gray-700">Small Section</span>
                        </label>
                        <button
                            class="px-6 py-2 border-gray-800 text-gray-800 font-medium text-xs leading-normal uppercase rounded shadow-sm hover:bg-red-700 hover:shadow-md focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out flex align-center"
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

<script setup>
// TODO: darkreader
import debounce from 'lodash.debounce';

const debouncedRender = debounce(render, 300);
const themes = {
    moonstone_blue: {
        name: "Moonstone Blue",
        colors: ['#536184', '#62869a', '#88a7bb'],
    },
    jade_green: {
        name: "Jade Green",
        colors: ['#4e6861', '#799e98', '#87b2a9'],
    },
    blood_moon: {
        name: "Blood Moon",
        colors: ['#824e4c', '#9e5653', '#ae5d59'],
    },
    mahogany: {
        name: "Mahogany",
        colors: ['#9c7b3d', '#b09254', '#bea162'],
    },
    lavender: {
        name: "Lavender",
        colors: ['#847490', '#988a9f', '#ab9eaf'],
    },
};

const darkThemes = {
    tilDawn: {
        name: 'Til Dawn Edition',
        colors: ['#0f0f2c', '#8c5a4c', '#604959', '#443749', '#474a5a'],
        stops: [0, 50, 75, 85, 100],
        angle: 75,
    },
    lateNight: {
        name: 'Late Night Edition',
        colors: ['#090927', '#2d475b'],
        stops: [0, 100],
        angle: 75,
    },
};

const themeEntries = Object.entries({...themes, ...darkThemes});

const albumCoverCanvas = ref(null);
const supportsClipboardApi = ref(false);
const copyToClipboardText = ref('Copy to Clipboard');
const croppedAlbumImage = ref(null);
const activeThemeName = ref('tilDawn');

const albumTitle = ref('Midnights');
const albumSubtitle = ref('(The Til Dawn Edition)');
const albumImage = ref('img/cover_image_moonstone_blue.jpg');
const sections = ref([
    {
        title: "",
        tracks: [
            "Lavender Haze",
            "Maroon",
            "Anti-Hero",
            "Snow On The Beach",
            "You're On Your Own, Kid",
            "Midnight Rain",
            "Question...?",
            "Vigilante Shit",
            "Bejeweled",
            "Labyrinth",
            "Karma",
            "Sweet Nothing",
            "Mastermind",
        ],
    },
    {
        title: "3am Tracks",
        tracks: [
            "The Great War",
            "Bigger Than The Whole Sky",
            "Paris",
            "High Infidelity",
            "Glitch",
            "Would've, Could've, Should've",
            "Dear Reader",
        ],
        isSmall: true,
    },
    {
        title: "Til Dawn Tracks",
        tracks: [
            "Hits Different",
            "Snow On The Beach",
            "Karma",
        ],
        isSmall: true,
    },
]);

const activeTheme = computed(() => themes[activeThemeName.value] ?? darkThemes[activeThemeName.value]);
const isDarkTheme = computed(() => activeThemeName.value in darkThemes);

watch(albumImage, () => {
    croppedAlbumImage.value = null;
});
watch(activeThemeName, () => {
    if (!albumImage.value.startsWith('img/')) {
        return;
    }
    if (['lavender', ...Object.keys(darkThemes)].includes(activeThemeName.value)) {
        albumImage.value = `img/cover_image_moonstone_blue.jpg`;
    } else {
        albumImage.value = `img/cover_image_${activeThemeName.value}.jpg`;
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
    window.WebFontConfig = {
        google: {
            families: ['Roboto:300,400,500,700', 'Helvetica:300,400,500,700'],
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
            s.parentNode.insertBefore(wf, s);
        })(document);
    }

    supportsClipboardApi.value = typeof ClipboardItem === 'function';
});

function copyToClipboard() {
    copyToClipboardText.value = 'Copy to Clipboard';
    albumCoverCanvas.value.toBlob(function(blob) {
        const item = new ClipboardItem({ 'image/png': blob });
        navigator.clipboard.write([item]);
        copyToClipboardText.value = 'Copied to Clipboard';
        setTimeout(function() {
            copyToClipboardText.value = 'Copy to Clipboard';
        }, 3000);
    });
}

function download() {
    const canvasImage = albumCoverCanvas.value.toDataURL('image/png').replace("image/png", "image/octet-stream");
    const link = document.createElement('a');
    const fileName = `midnightsmaker-com_${slugify(albumTitle.value || 'midnights')}`.slice(0, 199);
    link.download = `${fileName}.png`;
    link.href = canvasImage;
    link.click();
}

function addSection() {
    sections.value.push({
        title: 'New Section',
        tracks: [],
        isSmall: false,
    });
    sections.value = [...sections.value];
}

function removeSection(sectionIndex) {
    sections.value.splice(sectionIndex, 1);
    sections.value = [...sections.value];
}

function addTrack(sectionIndex) {
    sections.value[sectionIndex].tracks.push('New Track');
    sections.value = [...sections.value];
}

function removeTrack(sectionIndex, trackIndex) {
    sections.value[sectionIndex].tracks.splice(trackIndex, 1);
    sections.value = [...sections.value];
}

function onImageChosen(e) {
    if (e.target.files.length <= 0) {
        return;
    }
    const reader = new FileReader();
    reader.onload = function(e) {
        albumImage.value = e.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
}

async function render() {
    const canvas = albumCoverCanvas.value;
    const letterSpacing = canvas.style.letterSpacing;
    const ctx = canvas.getContext('2d');

    const font = "Helvetica";

    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // background color
    if (isDarkTheme.value) {
        const angle = activeTheme.value.angle * Math.PI / 180;
        var x2 = canvas.width * Math.cos(angle);  // angle in radians
        var y2 = canvas.height * Math.sin(angle);  // angle in radians
        const gradient = ctx.createLinearGradient(0, 0, x2, y2);
        for (let i = 0; i < activeTheme.value.colors.length; i++) {
            gradient.addColorStop(activeTheme.value.stops[i] / 100, activeTheme.value.colors[i]);
        }
        ctx.fillStyle = gradient;
    } else {
        ctx.fillStyle = '#e9e8e4';
    }
    ctx.fillRect(0,0, canvas.width, canvas.height);

    // watermark
    if (isDarkTheme.value) {
        ctx.fillStyle = `#e9e8e46F`;
    } else {
        ctx.fillStyle = `${activeTheme.value.colors[1]}6F`;
    }
    ctx.font = `300 16px ${font}`;
    ctx.fillText('made with midnightsmaker.com', 10, 24);

    // album title
    canvas.style.letterSpacing = '-2px';
    ctx.font = `700 78px ${font}`;
    // gradient for album title
    if (!isDarkTheme.value) {
        const gradient = ctx.createLinearGradient(233, 0, 233 + ctx.measureText(albumTitle.value).width, 0);
        gradient.addColorStop(0,activeTheme.value.colors[0]);
        gradient.addColorStop(0.45, activeTheme.value.colors[1]);
        gradient.addColorStop(1, activeTheme.value.colors[2]);
        ctx.fillStyle = gradient;
    } else {
        ctx.fillStyle = '#e9e8e4';
    }
    ctx.fillText(albumTitle.value, 233, 190 / 0.8, 737);
    const albumTitleWidth = ctx.measureText(albumTitle.value).width;

    // restore letterSpacing
    canvas.style.letterSpacing = letterSpacing;

    // album subtitle
    ctx.font = `400 24px ${font}`;
    ctx.fillText(albumSubtitle.value, 233 + albumTitleWidth + 12, 190 / 0.8, 737);

    const sideGradient = [
        { offset: 0, color: activeTheme.value.colors[2] },
        { offset: 0.12, color: activeTheme.value.colors[1] },
        { offset: 1, color: activeTheme.value.colors[0] },
    ];

    const sectionTitleHeight = (isSmall) => isSmall ? 25 : 31;
    const trackTitleHeight = (isSmall) => isSmall ? 17 : 20;

    const sideGradientWidth = Math.max(...sections.value.flatMap(section => [section.title, ...section.tracks]).map(text => ctx.measureText(text).width));

    let currentSectionStart = canvas.height - sections.value.reduce((acc, section) => {
        let currentHeight = 0;
        currentHeight += sectionTitleHeight(section.isSmall);
        currentHeight += trackTitleHeight(section.isSmall) * section.tracks.length;
        currentHeight += 12;
        return acc + currentHeight;
    }, 0);
    
    for (const section of sections.value) {
        // section title
        ctx.font = section.isSmall ? `400 15px ${font}` : `400 18px ${font}`;
        addGradientText(ctx, section.title, 30, currentSectionStart, sideGradient, sideGradientWidth);
        if (section.title !== '')
            textUnderline(ctx, section.title, 30, currentSectionStart, 18, sideGradient);

        // section tracks
        ctx.font = section.isSmall ? `500 15px ${font}` : `500 18px ${font}`;
        for (let i = 0; i < section.tracks.length; i++) {
            addGradientText(ctx, section.tracks[i], 30, currentSectionStart + sectionTitleHeight(section.isSmall) + trackTitleHeight(section.isSmall) * i, sideGradient, sideGradientWidth);
        }

        currentSectionStart += sectionTitleHeight(section.isSmall) + trackTitleHeight(section.isSmall) * section.tracks.length + 12;
    }

    // album image
    if (!croppedAlbumImage.value) {
        croppedAlbumImage.value = (await crop(albumImage.value, 767 / 727)).toDataURL();
    }
    const coverImage = new Image();
    coverImage.onload = () => {
        const imageWidth = 767;
        const imageHeight = 727;
        ctx.drawImage(coverImage, 0, 0, coverImage.width, coverImage.height, 233 + 4, 274, imageWidth, imageHeight);
    };
    coverImage.src = croppedAlbumImage.value;
}

function addGradientText(ctx, text, x, y, gradientStops, gradientWidth, maxWidth) {
    if (isDarkTheme.value) {
        ctx.fillStyle = '#e9e8e4';
    } else {
        const gradient = ctx.createLinearGradient(x, 0, x + gradientWidth, 0);
        gradientStops.forEach(stop => gradient.addColorStop(stop.offset, stop.color));
        // Fill with gradient
        ctx.fillStyle = gradient;
    }
    ctx.fillText(text, x, y, maxWidth);
}

function textUnderline(context, text, x, y, textSize, gradientStops) {
    const textWidth = context.measureText(text).width;
    let startX;
    const startY = y + (textSize / 15) + 2;
    let endX;
    const endY = startY;
    const underlineHeight = 1.5;

    context.beginPath();
    startX = x;
    endX = x + textWidth + 1;

    if (isDarkTheme.value) {
        context.strokeStyle = '#e9e8e4';
    } else {
        const gradient = context.createLinearGradient(x, 0, x + textWidth, 0);
        gradientStops.forEach(stop => gradient.addColorStop(stop.offset, stop.color));
        context.strokeStyle = gradient;
    }
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
function crop(url, aspectRatio) {
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
            const ctx = outputImage.getContext('2d');
            ctx.drawImage(inputImage, outputX, outputY);
            resolve(outputImage);
        };

        // start loading our image
        inputImage.src = url;
    });
}

/**
 * https://lucidar.me/en/web-dev/how-to-slugify-a-string-in-javascript/
 * @param str
 * @returns {string}
 */
function slugify(str) {
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
