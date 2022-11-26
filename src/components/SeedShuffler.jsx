import { useState, useEffect, useRef } from 'react'
import styled from '@emotion/styled/macro'
import { WL_ENGLISH } from '../constants/variables'
import { shuffleArray } from '../helpers/csprng'
import Select from 'react-select'
import { jsPDF } from 'jspdf'
import { bip39LanguageOptions } from '../helpers/ui'

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
        list[firstLetter].push({ index, word })
      })
      Object.keys(list).map((l) =>
        list[l].sort((a, b) => a.word.localeCompare(b.word)),
      )
      setShuffledWordlist(list)
    } catch (err) {
      console.error(err)
    }
  }

  function downloadPdf() {
    const doc = new jsPDF()
    /*
    doc.html(ref.current, {
      callback: function (doc) {
        doc.save('My_Seed_Book.pdf')
      },
    })
    */
    doc.text('1934. abandon 2044. arrow 14. array', 10, 10)
    doc.save('My_Seed_Book.pdf')
  }

  function clear() {
    setShuffledWordlist(null)
  }

  function handleLanguageChange(e) {
    const { value } = e
    setLanguage(value)
  }

  return (
    <Container>
      <h1>Shuffle Seed</h1>
      {!Boolean(shuffledWordlist) && (
        <div>
          <SelectWrapper>
            <p>Select BIP39 language</p>
            <Select
              name="language"
              options={bip39LanguageOptions}
              defaultValue={bip39LanguageOptions[0]}
              value={bip39LanguageOptions.find((o) => o.value === language)}
              onChange={handleLanguageChange}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderColor: state.isFocused
                    ? 'var(--theme-brand)'
                    : 'hsl(0, 0%, 80%)',
                }),
              }}
            />
          </SelectWrapper>
          <button
            className="button"
            disabled={!wordlist}
            onClick={() => generateSeedMatric()}
          >
            Generate Seed Matrix
          </button>
        </div>
      )}
      {Boolean(shuffledWordlist) && (
        <Panel>
          <h3 style={{ textAlign: 'center', marginBottom: 20 }}>
            Your unique seed matrix.
          </h3>
          <button
            className="button"
            disabled={!wordlist}
            onClick={() => downloadPdf()}
          >
            Download Seed Matrix
          </button>
          <button className="button-link" onClick={() => clear()}>
            Clear
          </button>
        </Panel>
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
                        <div>{word}</div>
                        <div>{index + 1}</div>
                      </div>
                    )
                  })}
                </WordBox>
              )
            })}
      </Grid>
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
  margin: 'auto',
  height: '100%',
  h1: {
    marginBottom: 30,
  },
})

const Panel = styled.div({
  display: 'flex',
  flexDirection: 'column',
})

const Grid = styled.div({
  width: '90%',
  padding: '1.5rem 2.2rem',
  display: 'grid',
  gap: '1.2rem',
  gridTemplateColumns: 'repeat(6, 1fr)',
  '@media (max-width: 2200px)': {
    gridTemplateColumns: 'repeat(4, 1fr)',
  },
  '@media (max-width: 1024px)': {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
  '@media (max-width: 768px)': {
    gridTemplateColumns: 'repeat(1, 1fr)',
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

const SelectWrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: 40,
})
