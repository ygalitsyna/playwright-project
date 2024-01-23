import { Page, Locator, expect } from "@playwright/test";

export class SearchResultPage {
    readonly page: Page
    readonly firstVideo: Locator
    readonly secondVideo: Locator
    readonly firstVideoTitle: Locator
    readonly secondVideoTitle: Locator
    readonly firstVideoChannel: Locator
    readonly secondVideoChannel: Locator
    readonly firstVideoDescription: Locator
    readonly secondVideoDescription: Locator
    readonly firstVideoImage: Locator
    readonly secondVideoImage: Locator
    readonly filtersButton: Locator
    readonly sortByViewCountButton: Locator
    readonly viewsCountList: Locator
    readonly sortByTodayUploadDateButton: Locator
    readonly timesList: Locator
    readonly videoList:Locator
    readonly sortByDuration: Locator
    readonly durationsList: Locator
    readonly sortByPlaylistType: Locator
    readonly playlistLabelList: Locator
    readonly playlistList: Locator

    constructor(page: Page){
        this.page = page
        this.firstVideo = page.locator('#contents ytd-video-renderer').first()
        this.secondVideo = page.locator('#contents ytd-video-renderer').nth(1)
        this.firstVideoTitle = this.firstVideo.locator('#video-title')
        this.secondVideoTitle = this.secondVideo.locator('#video-title')
        this.firstVideoChannel = this.firstVideo.locator('#channel-info')
        this.secondVideoChannel = this.secondVideo.locator('#channel-info')
        this.firstVideoDescription = this.firstVideo.locator('.metadata-snippet-container')
        this.secondVideoDescription = this.secondVideo.locator('.metadata-snippet-container')
        this.firstVideoImage = this.firstVideo.locator('a yt-image img')
        this.secondVideoImage = this.secondVideo.locator('a yt-image img')
        this.filtersButton = page.getByLabel('Search filters')
        this.sortByViewCountButton = page.getByRole('link', { name: 'View count' })
        this.videoList = page.locator('#contents ytd-video-renderer')
        this.viewsCountList = this.videoList.locator('.inline-metadata-item').getByText('views')
        this.sortByTodayUploadDateButton = page.getByRole('link', { name: 'Today' })
        this.timesList = this.videoList.locator('.inline-metadata-item').getByText(' ago')
        this.sortByDuration = page.getByRole('link', { name: '- 20 minutes' })
        this.durationsList = this.videoList.locator('#time-status')
        this.sortByPlaylistType = page.getByRole('link', { name: 'Playlist' })
        this.playlistList = page.locator('#contents ytd-playlist-renderer')
        this.playlistLabelList = this.playlistList.locator('#overlays yt-formatted-string')
    }

    async sortVideoByViewCount(){
        await this.filtersButton.click()
        await this.sortByViewCountButton.click()
        await this.page.waitForURL('/results?search_query=funny+cats&sp=*')
    }

    async getAllviewsCount(){
        await expect(this.viewsCountList).toHaveCount(20)
        const listOfViewsCount: number[] = []
        for(const viewsCount of await this.viewsCountList.all()){
            let text = await viewsCount.textContent()
            let number = Number(text?.replace('M views', ''))
            listOfViewsCount.push(number)
        }
        return listOfViewsCount
    }

    async sortVideoByTodayUploadDate(){
        await this.filtersButton.click()
        await this.sortByTodayUploadDateButton.click()
        await this.page.waitForURL('/results?search_query=funny+cats&sp=*')
    }

    async getAllTimes(){
        await expect(this.timesList).toHaveCount(20)
        const listOfTimes: number[] = []
        for(const time of await this.timesList.all()){
            let text = await time.textContent()
            if( text?.replace('Streamed ','').includes('minute')){
                listOfTimes.push(Math.ceil(Number(text?.replace('Streamed ','').replace(/( minute ago)|( minutes ago)/, '')) / 60))
            } else if( text?.includes('hour')){
                listOfTimes.push(Number(text?.replace('Streamed ','').replace(/( hour ago)|( hours ago)/, '')))
            } else if( text?.includes('day')){
                listOfTimes.push(24 * Number(text?.replace('Streamed ','').replace(/( day ago)|( days ago)/, '')))
            }
        }
        return listOfTimes
    }

    async sortVideoByFeature(feature: string){
        await this.filtersButton.click()
        await this.page.getByRole('link', { name: `${feature}`, exact: true }).click()
        await this.page.waitForURL('/results?search_query=funny+cats&sp=*')
        return feature
    }

    async getAllVideoCount(){
        await expect(this.videoList).toHaveCount(20)
        return (await this.videoList.all()).length   
    }

    async getAllVideoWithSpecifiedTag(feature: string){      
        const listOfVideoWithTag: (string|null)[] = []
        for(const tag of await this.videoList.locator('#badges').all()){
            let text = await tag.textContent()
            let featureTag = feature.toUpperCase()
            if(featureTag == 'SUBTITLES/CC') {
                featureTag = featureTag.split('/')[1]
            } 
            if(text?.includes(`${featureTag}`)) listOfVideoWithTag.push(text)
        }
        return listOfVideoWithTag.length
    }

    async sortVideoByDuration(){
        await this.filtersButton.click()
        await this.sortByDuration.click()
        await this.page.waitForURL('/results?search_query=funny+cats&sp=*')
    }

    async getAllVideoDuration(){
        await expect(this.durationsList).toHaveCount(22)
        const listOfAllVideoDuration: (number|null)[] = []
        for(const duration of await this.durationsList.all()){
            let text = await duration.textContent()
            let number = Number(text?.trim().split(':')[0])
            listOfAllVideoDuration.push(number)
        }
        return listOfAllVideoDuration
    }

    async sortVideoByPlaylistType(){
        await this.filtersButton.click()
        await this.sortByPlaylistType.click()
        await this.page.waitForURL('/results?search_query=funny+cats&sp=*')
    }

    async getAllPlaylistCount(){
        return (await this.playlistList.all()).length   
    }

    async getAllVideoPlaylistType(){      
        const listOfAllVideoWithPlaylistType: (number|null)[] = []
        for(const playlistLabel of await this.playlistLabelList.all()){
            let text = await playlistLabel.textContent()
            let number = Number(text?.replace(',', '').split(' ')[0])
            if(number > 1) listOfAllVideoWithPlaylistType.push(number)
        }
        return listOfAllVideoWithPlaylistType.length
    }
}
