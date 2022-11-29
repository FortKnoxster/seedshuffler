import { useState, useEffect, useRef } from 'react'
import styled from '@emotion/styled/macro'
import { FormattedMessage } from 'react-intl'
import {
  WL_ENGLISH,
  APP_BRAND_NAME,
  PDF_FILE_NAME,
} from '../constants/variables'
import { shuffleArray } from '../helpers/csprng'
import Select from 'react-select'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import { bip39LanguageOptions } from '../helpers/ui'
import {
  exampleSeedPhrase1,
  exampleSeedPhrase2,
  exampleNumbers1,
  exampleNumbers2,
} from './viewModel.js'
import { NotoSansRegular } from '../assets/fonts/noto-sans/NotoSans-Regular-normal.js'
//import { MPLUS1 } from '../assets/fonts/mplus1/MPLUS1-normal.js'

// eslint-disable-next-line no-empty-pattern
const SeedShuffler = ({}) => {
  const ref = useRef()
  const [shuffledWordlist, setShuffledWordlist] = useState(null)
  const [wordlist, setWordlist] = useState(null)
  const [language, setLanguage] = useState(WL_ENGLISH)

  useEffect(() => {
    async function initWordlist() {
      const wl = await import(`../wordlists/${language}.json`)
      setWordlist(wl.default)
    }
    initWordlist()
  }, [language])

  async function generateSeedMatric() {
    try {
      const wordlistCopy = [...wordlist]
      const swl = await shuffleArray(wordlistCopy)
      const list = {}
      swl.forEach((word, index) => {
        const firstLetter = word.charAt(0).toUpperCase()
        if (!list[firstLetter]) {
          list[firstLetter] = []
        }
        list[firstLetter].push({ index: index + 1, word })
      })
      Object.keys(list).map((l) =>
        list[l].sort((a, b) => a.word.localeCompare(b.word)),
      )
      setShuffledWordlist(list)
    } catch (err) {
      console.error(err)
    }
  }
  /*
  function downloadPdf2() {
    var doc = new jsPDF()
    var text =
      'This is a text without real content but with 59 characters. This is a text without real content but with 59 characters.This is a text without real content but with 59 characters.This is a text without real content but with 59 characters.This is a text without real content but with 59 characters.'

    var lineHeight = doc.getLineHeight(text) / doc.internal.scaleFactor
    var splittedText = doc.splitTextToSize(text, 190)
    console.log('splittedText', splittedText)
    var lines = splittedText.length // splitted text is a string array
    var blockHeight = lines * lineHeight
    var yPos = 10
    var xPos = 10
    doc.text(xPos, yPos, splittedText)
    yPos += blockHeight
    doc.text(xPos, yPos, '----- This text follows the previous text block.')
    yPos += lineHeight
    doc.text(
      xPos,
      yPos,
      '----- LineHeight=' + lineHeight + ' / blockHeight=' + blockHeight,
    )
    yPos += lineHeight
    doc.text(
      xPos,
      yPos,
      '----- doc.internal.scaleFactor = ' + doc.internal.scaleFactor,
    )
    doc.save(PDF_FILE_NAME)
  }
*/
  function downloadPdf() {
    const doc = new jsPDF()

    doc.addFileToVFS('NotoSans-Regular-normal.ttf', NotoSansRegular)
    doc.addFont('NotoSans-Regular-normal.ttf', 'NotoSans-Regular', 'normal')
    doc.setFont('NotoSans-Regular')
    /*
    doc.addFileToVFS('MPLUS1-normal.ttf', MPLUS1)
    doc.addFont('MPLUS1.ttf', 'MPLUS1', 'normal')
    doc.setFont('MPLUS1')
    console.log('font size', doc.getFontSize())
    */

    //doc.addImage(logo, 'PNG', 60, 5, 79, 13)
    doc.setFontSize(3)
    const maxCols = 13
    let y = 25
    Object.keys(shuffledWordlist)
      .sort()
      .forEach((letter) => {
        //doc.text(letter, x, y)
        y += 5
        //doc.text(shuffledWordlist[letter], 10, y)
        let text = ''

        let colIndex = 1
        let rowIndex = 0
        const rows = []
        shuffledWordlist[letter].forEach(({ word, index }, i) => {
          //y += 5
          text += `${word} ${index}  `
          if (colIndex > maxCols) {
            colIndex = 0
            ++rowIndex
            rows[rowIndex] = []
          }
          if (!rows[rowIndex]) {
            rows[rowIndex] = []
          }
          rows[rowIndex].push(
            {
              content: index,
              styles: {
                halign: 'right',
                cellPadding: 1,
                font: 'NotoSans-Regular',
                fontSize: 9,
                textColor: '#000000',
              },
            },
            {
              content: word,
              styles: {
                cellPadding: 1,
                font: 'NotoSans-Regular',
                fontSize: 9,
                textColor: '#000000',
              },
            },
          )
          colIndex += 2
          /*
          if ((i + 1) % 2 === 0) {
            // 2nd row
            rows[1].push(word, index)
          } else if ((i + 1) % 3 === 0) {
            // 3rd row
            rows[2].push(word, index)
          } else if ((i + 1) % 4 === 0) {
            // 4th row
            rows[3].push(word, index)
          } else {
            // 1st row
            rows[0].push(word, index)
          }
          */

          //x += 5
        })
        const lineHeight = doc.getLineHeight(text) / doc.internal.scaleFactor
        const splittedText = doc.splitTextToSize(text, 190)
        //console.log('splittedText', splittedText)
        const lines = splittedText.length // splitted text is a string array
        const blockHeight = lines * lineHeight
        //console.log('text', text)
        autoTable(doc, {
          //head: [[{ content: shuffledWordlist[letter], colSpan: maxCols }]],
          //head: [[shuffledWordlist[letter]], [], [], [], [], [], [], [], []],
          body: rows,
        })

        //const r = doc.text(splittedText, x, y)
        if (y >= 265) {
          y = 5
          //doc.addPage()
        } else {
          y += blockHeight
        }
        y += 5
      })

    doc.save(PDF_FILE_NAME)
  }

  function handleLanguageChange(e) {
    const { value } = e
    setLanguage(value)
  }

  return (
    <Container>
      <h1>
        <FormattedMessage id="seed.title" />
      </h1>
      <h2 className="title">
        <FormattedMessage id="seed.subtitle" />
      </h2>
      <p className="intro-text">
        <FormattedMessage id="nav.intro.1" />
      </p>
      <p className="intro-text">
        <FormattedMessage id="nav.intro.2" />
      </p>
      <p className="intro-text">
        <FormattedMessage
          id="nav.intro.3"
          values={{
            brandName: APP_BRAND_NAME,
          }}
        />
      </p>
      {!Boolean(shuffledWordlist) && (
        <GenerateWrapper>
          <SelectWrapper>
            <Select
              name="language"
              options={bip39LanguageOptions}
              defaultValue={bip39LanguageOptions[0]}
              value={bip39LanguageOptions.find((o) => o.value === language)}
              onChange={handleLanguageChange}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  border: `2px solid var(--theme-brand)`,
                  '&:hover': {
                    borderColor: 'var(--theme-brand)',
                  },
                  '&:focus': {
                    border: `2px solid var(--theme-brand)`,
                  },
                }),
              }}
            />
          </SelectWrapper>
          <button
            className="button"
            disabled={!wordlist}
            onClick={() => generateSeedMatric()}
          >
            <FormattedMessage id="seed.button.generate" />
          </button>
        </GenerateWrapper>
      )}
      {Boolean(shuffledWordlist) && (
        <h2 className="subtitle">
          <FormattedMessage id="seed.yourSeed" />
        </h2>
      )}
      <Grid ref={ref}>
        {Boolean(shuffledWordlist) &&
          Object.keys(shuffledWordlist)
            .sort()
            .map((letter) => {
              return (
                <WordBox key={letter}>
                  <h3>{letter}</h3>
                  {shuffledWordlist[letter].map(({ word, index }) => {
                    return (
                      <div key={index} className="wordlist">
                        <div>{index}</div>
                        <div>{word}</div>
                      </div>
                    )
                  })}
                </WordBox>
              )
            })}
      </Grid>
      {Boolean(shuffledWordlist) && (
        <>
          <Panel>
            <button
              className="button"
              disabled={!wordlist}
              onClick={() => downloadPdf()}
            >
              <FormattedMessage id="seed.button.download" />
            </button>
          </Panel>
          <ExampleContent>
            <h2 className="subtitle">
              <FormattedMessage id="nav.example.title" />
            </h2>
            <p className="intro-text">
              <FormattedMessage id="nav.example.text.1" />
            </p>
            <div className="inline">
              <Ul>
                {exampleSeedPhrase1.map((seed) => {
                  return (
                    <li key={seed}>
                      <span>{seed}</span>
                    </li>
                  )
                })}
              </Ul>
              <Ul>
                {exampleSeedPhrase2.map((seed) => {
                  return (
                    <li key={seed}>
                      <span>{seed}</span>
                    </li>
                  )
                })}
              </Ul>
            </div>
            <p className="intro-text">
              <FormattedMessage id="nav.example.text.2" />
            </p>
            <p className="intro-text">
              <FormattedMessage id="nav.example.text.3" />
            </p>
            <p className="intro-text">
              <FormattedMessage id="nav.example.text.4" />
            </p>
            <div className="inline">
              <Ul>
                {exampleNumbers1.map((number) => {
                  return (
                    <li key={number}>
                      <span>{number}</span>
                    </li>
                  )
                })}
              </Ul>
              <Ul>
                {exampleNumbers2.map((number) => {
                  return (
                    <li key={number}>
                      <span>{number}</span>
                    </li>
                  )
                })}
              </Ul>
            </div>
            <p className="intro-text">
              <FormattedMessage id="nav.example.text.5" />
            </p>
            <p className="intro-text">
              <FormattedMessage id="nav.example.text.6" />
            </p>
            <p className="intro-text">
              <FormattedMessage id="nav.example.text.7" />
            </p>
          </ExampleContent>
        </>
      )}
    </Container>
  )
}

export default SeedShuffler

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '2.2rem',
  width: '80%',
  height: '100%',
  h3: {
    maxWidth: '55%',
  },
  p: {
    maxWidth: '55%',
    '@media (max-width: 2200px)': {
      maxWidth: '75%',
    },
    '@media (max-width: 768px)': {
      maxWidth: '100%',
    },
  },
  '@media (max-width: 768px)': {
    width: '90%',
  },
})

const Panel = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '35%',
  '& .button': {
    marginTop: 40,
  },
  '@media (max-width: 2200px)': {
    maxWidth: '55%',
  },
  '@media (max-width: 768px)': {
    width: '100%',
    maxWidth: '100%',
  },
})

const Grid = styled.div({
  width: '90%',
  padding: '1.5rem 2.2rem',
  display: 'grid',
  gap: '1.2rem',
  gridTemplateColumns: 'repeat(5, 1fr)',
  '@media (max-width: 2200px)': {
    gridTemplateColumns: 'repeat(5, 1fr)',
  },
  '@media (max-width: 1024px)': {
    gridTemplateColumns: 'repeat(4, 1fr)',
  },
  '@media (max-width: 768px)': {
    width: '95%',
    gap: '1.4rem',
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
})

const WordBox = styled.code({
  position: 'relative',
  padding: '1rem',
  height: 280,
  transition: 'transform 100ms ease-in',
  backgroundColor: 'var(--theme-wordbox-background)',
  color: '#2e2e2e',
  overflow: 'auto',
  textAlign: 'left',
  width: '90%',
  '& .wordlist': {
    display: 'flex',
    justifyContent: 'space-between',
  },
  h3: {
    margin: '0 0 10px 0',
    padding: 0,
  },
})

const GenerateWrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '35%',
  '@media (max-width: 2200px)': {
    maxWidth: '55%',
  },
  '@media (max-width: 768px)': {
    width: '100%',
    maxWidth: '100%',
  },
})

const SelectWrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  marginTop: 40,
  marginBottom: 40,
})

const Ul = styled.ul({
  listStyleType: 'none',
  display: 'flex',
  flexDirection: 'column',
  marginTop: 15,
  marginBottom: 0,
  li: {
    display: 'flex',
    marginBottom: 20,
    span: {
      paddingLeft: 15,
    },
    div: {
      marginTop: 1,
    },
  },
  paddingLeft: 0,
})

const ExampleContent = styled.div({
  margin: '40px auto',
  width: '55%',
  p: {
    width: '100%',
    maxWidth: '100%',
  },
  '> div.inline': {
    display: 'flex',
  },
  '@media (max-width: 768px)': {
    width: '100%',
  },
})
